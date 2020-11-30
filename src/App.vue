<template>
  <div id="app">
    <h1>SHQ ACL TREE</h1>
    <div class="chart-wrapper" ref="wrapper">
      <svg ref="chart" class="chart" :style="{transform: `scale(${currentScale})` }"></svg>
      <div class="zoom">
        <span>Zoom: </span>
        <div @click="currentScale += 1">+</div>
        <div @click="currentScale -= 1">-</div>
        <input type="number" style="width: 50px" step="0.1" v-model="currentScale" @input="e => currentScale = Number(e.target.value)">
      </div>
      <div class="save">
        <h3>Save as new preset</h3>
        <button @click="handleSave">Save</button>
        <select name="select" @change="handleInput">
          <option :key="name" v-for="(option, name) in presets" :value="name">{{name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import defaultConfig from "@/defaultConfig";

export default {
  name: 'App',
  data() {
    return {
      nodeParams: {
        width: 150,
        height: 80,
        borderRadius: 20
      },
      root: defaultConfig,
      currentScale: 6,
      presets: { root: [...JSON.parse(JSON.stringify(defaultConfig))] }
    }
  },
  mounted() {
    this.initialize()
  },
  watch: {
    async root() {
      await this.$nextTick()
      this.initialize()
    }
  },
  methods: {
    handleSave() {
      this.$set(this.presets, 'New Preset' + Object.values(this.presets).length, this.root)
    },
    handleInput(e) {
      this.root = this.presets[e.target.value]
    },
    initialize() {
      this.$refs.chart.innerHTML = ""
      const svg = d3.select("svg")
          .attr("viewBox", '0 0 15000 3000')
      this.g = svg
          .append("g").attr("transform", "translate(40,80)")

      const tree = d3.tree().size([15000, 2250]);

      const stratify = d3.stratify().parentId(d => d.id.substring(0, d.id.lastIndexOf(".")))

      const root = stratify(this.root).sort((a, b) => a.height - b.height || a.id.localeCompare(b.id));

      this.links = this.g.selectAll(".link")
          .data(tree(root).links()).order()
          .enter()
          .append("path")
          .attr("class", ({source, target}) => `link ${!target.data.active || !source.data.active ? 'inactive' : 'active'}`)
          .attr("d", d3.linkVertical()
              .x(d => d.x)
              .y(d => d.y/2)
          )
          .attr("id", ({source, target}) => `${source.id}--${target.id}`)

      /** Nodes */

      this.node = this.g.selectAll(".node")
          .data(root.descendants()).order()
          .enter().append("g")
          .attr("class", d => {
            let className = 'node-group'
            if (!d.data.active) className += ' inactive'
            className += ` ${d.data.type}`
            return className;
          })
          .attr("transform", d => `translate(${d.x},${d.y/2})`)
          .attr("id", d => d.id)

      const rects = this.node.append("rect")
          .attr("width", this.nodeParams.width)
          .attr("height", this.nodeParams.height)
          .attr("rx", this.nodeParams.borderRadius)
          .attr("ry", this.nodeParams.borderRadius)
          .attr("class", 'node')
          .attr("transform", () => `translate(-${(this.nodeParams.width / 2)},-${this.nodeParams.height / 2})`)

      rects.on('mouseover', (e, d) => this.handleDescriptionToggle(e, d, true))
      rects.on('mouseout', (e, d) => this.handleDescriptionToggle(e, d, false))

      /** Deps circles */

      this.deps = this.node
          .filter(d => d.data.dependencies && d.data.dependencies.length)
          .append('circle')
          .attr("fill", "red")
          .attr("class", "dependency-tip")
          .attr("r", 10)
          .attr("transform", () => `translate(${this.nodeParams.width - 95},-${this.nodeParams.height - 60})`)


      this.deps.on('mouseover', (e, d) => this.handleTooltipToggle(e, d, true, 'dependencies'))
      this.deps.on('mouseout', (e, d) => this.handleTooltipToggle(e, d, false, 'dependencies'))

      /** Affects circles */
      this.affects = this.node
          .filter(d => d.data.affectsOn && d.data.affectsOn.length)
          .append('circle')
          .attr("class", "dependency-tip affect")
          .attr("r", 10)
          .attr("transform", () => `translate(${this.nodeParams.width - 95},-${this.nodeParams.height - 60})`)

      this.affects.on('mouseover', (e, d) => this.handleTooltipToggle(e, d, true, 'affectsOn'))
      this.affects.on('mouseout', (e, d) => this.handleTooltipToggle(e, d, false, 'affectsOn'))

      if (this.tooltip) {
        this.tooltip.remove()
      }

      this.tooltip = document.createElement('div')
      this.tooltip.className = 'tooltip'
      this.$refs.wrapper.appendChild(this.tooltip)

      this.node.append("text")
          .attr('class', 'title')
          .attr('text-anchor', 'middle')
          .style('pointer-events', 'none')
          .text(d => d.data.value)

      this.node.on('click', (e, d) => this.handleClick(e, d));
    },
    toggleActive(direction, flag, d) {
      if (d[direction]) {
        if (Array.isArray(d[direction])) {
          d[direction].forEach(node => {
            node.data.active = flag
            if (node[direction]) this.toggleActive(direction, flag, node)
          })
        } else {
          d[direction].data.active = flag
          this.toggleActive(direction, flag, d[direction])
        }
      }
    },
    handleClick(e, d) {
      if (d.data.dependencies && d.data.dependencies.length) {
        let available = true
        d.data.dependencies.forEach(dep => {
          const [target] = this.node
              .data()
              .filter(d => d.id === dep)
          if (!target.data.active) available = false
        })
        if (!available) return false;
      }
      d.data.active = !d.data.active
      const flag = d.data.active

      if (!flag && d.data.affectsOn && d.data.affectsOn.length) {
        d.data.affectsOn.forEach(dep => {
          const [target] = this.node
              .data()
              .filter(d => d.id === dep)
          target.data.active = false;
        })
      }

      if (d.children) this.toggleActive('children', flag, d)
      if (d.parent && flag) this.toggleActive('parent', flag, d)

      this.initialize()
    },
    handleDescriptionToggle(e, d, visible) {
      if (d.data.active) {
        this.tooltip.style.left = `${e.layerX + 50}px`
        this.tooltip.style.top = `${e.layerY - 75}px`
        this.tooltip.style.opacity = visible ? '1' : '0'
        this.tooltip.innerHTML = `
            <div class="description">
              <h2>${d.data.value}</h2>
              <h3>${d.data.type}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div class="image ${d.data.type}"></div>
            </div>
            `
      }
    },
    handleTooltipToggle(e, d, visible, type) {
      this.tooltip.style.left = `${e.layerX}px`
      this.tooltip.style.top = `${e.layerY - 50}px`
      this.tooltip.style.opacity = visible ? '1' : '0'
      const dependencies = d.data[type]
      const deps = [];
      dependencies.forEach(dep => {
        const res = []
        let [target] = this.node
            .data()
            .filter(d => d.id === dep)

        while (target) {
          res.push(target.data.value)
          target = target.parent
        }

        deps.push(res.reverse().join(" > "))
      })
      this.tooltip.innerHTML = `
            <div>
              <div><strong>${type === 'dependencies' ? 'Depends' : 'Affects'} on: </strong></div>
            </div>
            `
      deps.forEach(i => {
        const d = document.createElement('div')
        d.className = 'list'
        d.innerText = i
        this.tooltip.appendChild(d)
      })
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
.zoom {
  display: flex;
  position: fixed;
  right: 10px;
  top: 130px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid black;
  padding: 10px;
  & div {
    border: 1px solid black;
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    width: 20px;
    background-color: #fff;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  padding: 20px;
  margin: 5px;
  border: 1px solid black;
  overflow: auto;
}

.chart-wrapper {
  position: relative;

  & svg {
    transform: scale(1);
    transform-origin: top left;
    background-color: #c8c7c7;
  }
}

.link {
  fill: transparent;
  stroke: #118035;
  stroke-width: 2;

  &.inactive {
    stroke-width: 1;
    stroke: red;
    opacity: 0.5;
  }
}

.chart {
  width: 100%;
  height: 100%;
  transform: scale(1);
  transform-origin: top left;
}

.node-group {
  &.module {
    rect {
      fill: #2797bf;
    }
  }

  &.submodule {
    rect {
      fill: orange;
    }
  }

  &.widget {
    rect {
      fill: purple;
    }
  }

  &.action {
    rect {
      fill: #2cd9a9;
    }
  }

  &.nav {
    rect {
      fill: #d97d2c;
    }
  }

  &.inactive {
    rect {
      fill: grey;
      stroke: grey;
    }
  }
}

.node {
  stroke: #2c3e50;
  stroke-width: 2;
  fill: #3980fa;
  cursor: pointer;
}

.title {
  fill: white;
  font-size: 12px;
  font-weight: bold;
}

.dependency-tip {
  cursor: pointer;
  stroke: white;
  stroke-width: 2;
  fill: #18c4c4;

  &.affect {
    fill: #15be3a;
  }
}

.tooltip {
  position: absolute;
  pointer-events: none;
  background-color: #fff;
  padding: 10px;
  border: 1px solid black;
  box-shadow: 1px 1px 12px rgba(0,0,0,.3);
  border-radius: 6px;
  text-align: left;
  min-width: 150px;
  opacity: 0;

   .list {
     font-weight: bold;
     color: #2a992a;
     font-size: 10px;
   }
}

.save {
  display: flex;
  position: fixed;
  right: 10px;
  top: 10px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 5px;
  background-color: white;
  & select, {
    width: 100%;
  }
  & button {
    width: 100px;
    margin-bottom: 10px;
  }
}

.description {
  padding: 10px;
  background-color: #fff;
  border: 1px solid black;
  width: 200px;
  & h2 {
    margin:  0;
  }
  & h3 {
    margin:  0;
  }
  & p {
    font-size: 10px;
    font-style: italic;
  }

  & .image {
    width: 100%;
    height: 75px;
    background-size: cover;
    &.nav {
      background-image: url('./img/nav.png');
    }
    &.submodule {
      background-image: url('./img/submodule.png');
    }
    &.module {
      background-image: url('./img/module.png');
    }
    &.widget {
      background-image: url('./img/widget.png');
    }
    &.action {
      background-image: url('./img/action.png');
    }
  }


}
</style>
