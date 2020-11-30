export default  [
  {id: 'root', value: 'SpendHQ', type: 'root', active: true},

  /** ========================= DOCUMENT MANAGEMENT ========================= */

  {id: 'root.document_management', type: 'module', value: 'Document Management', active: true},

  {id: 'root.document_management.contracts', type: 'submodule', value: 'Contracts', active: true},
  {id: 'root.document_management.contracts.active_contracts', type: 'widget', value: 'Active Contracts (w)', active: true},
  {id: 'root.document_management.contracts.upcoming_contracts', type: 'widget', value: 'Upcoming Contracts (w)', active: true},
  {id: 'root.document_management.contracts.document_storage', type: 'widget', value: 'Document Storage (w)', active: true},
  {id: 'root.document_management.contracts.contract_renewals', type: 'widget', value: 'Contract Renewals (w)', active: true},
  {id: 'root.document_management.contracts.contracts_table', type: 'widget', value: 'Contract Table (w)', active: true},

  {id: 'root.document_management.all_documents', type: 'submodule', value: 'All Documents', active: true},
  {id: 'root.document_management.all_documents.documents', type: 'widget', value: 'Documents (w)', active: true},
  {id: 'root.document_management.all_documents.document_storage', type: 'widget', value: 'Document Storage (w)', active: true},
  {id: 'root.document_management.all_documents.search', type: 'widget', value: 'Search (w)', active: true},
  {id: 'root.document_management.all_documents.matching_results_table', type: 'widget', value: 'Matching Results Table (w)', active: true},

  {id: 'root.document_management.upload', type: 'submodule', value: 'Upload', active: true},
  {id: 'root.document_management.upload.upload_area_table', type: 'widget', value: 'Upload Area Table (w)', active: true},

  {id: 'root.document_management.profile', type: 'submodule', value: 'Contract/Document Profile', active: true},
  {id: 'root.document_management.profile.create', type: 'action', value: 'Profile Create (w)', active: true},
  {id: 'root.document_management.profile.edit', type: 'action', value: 'Profile Edit (w)', active: true},

  /** ========================= DOCUMENT MANAGEMENT end ========================= */
  /** ========================= REFRESH CENTER ========================= */

  {id: 'root.refresh_center', type: 'module', value: 'Refresh Center', active: true},

  {id: 'root.refresh_center.upload', type: 'submodule', value: 'Upload', active: true},
  {id: 'root.refresh_center.upload.upload_area_table', type: 'widget', value: 'Upload Area Table (w)', active: true},

  {
    id: 'root.refresh_center.all_files',
    type: 'submodule',
    value: 'All Files',
    active: true,
  },
  {id: 'root.refresh_center.all_files.table', type: 'widget', value: 'Table (w)', active: true},

  /** ========================= REFRESH CENTER end ========================= */
  /** ========================= SPEND PROFILE ========================= */

  {id: 'root.spend_profile', type: 'module', value: 'Spend Profile', active: true},

  {id: 'root.spend_profile.details', type: 'submodule', value: 'Details', active: true},
  {id: 'root.spend_profile.details.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.spend_profile.details.suppliers', type: 'widget', value: 'Suppliers (w)', active: true},
  {id: 'root.spend_profile.details.categories', type: 'widget', value: 'Categories (w)', active: true},
  {id: 'root.spend_profile.details.spend_breakdown', type: 'widget', value: 'Spend Breakdown (w)', active: true},
  {id: 'root.spend_profile.details.table', type: 'widget', value: 'Table (w)', active: true},

  {id: 'root.spend_profile.compare', type: 'submodule', value: 'Compare', active: true},
  {id: 'root.spend_profile.compare.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.spend_profile.compare.category_count', type: 'widget', value: 'Category Count (w)', active: true},
  {id: 'root.spend_profile.compare.city_count', type: 'widget', value: 'City Count (w)', active: true},
  {id: 'root.spend_profile.compare.table', type: 'widget', value: 'Table (w)', active: true},
  {id: 'root.spend_profile.compare.breakdown', type: 'widget', value: 'Brekdown (w)', active: true},

  {id: 'root.spend_profile.trending', type: 'submodule', value: 'Trending', active: true},
  {id: 'root.spend_profile.trending.period_one', type: 'widget', value: 'Period One (w)', active: true},
  {id: 'root.spend_profile.trending.period_two', type: 'widget', value: 'Period Two (w)', active: true},
  {id: 'root.spend_profile.trending.variance', type: 'widget', value: 'Variance (w)', active: true},
  {id: 'root.spend_profile.trending.breakdown', type: 'widget', value: 'Breakdown (w)', active: true},
  {id: 'root.spend_profile.trending.table', type: 'widget', value: 'Table (w)', active: true},

  /** ========================= SPEND PROFILE end ========================= */
  /** ========================= SUPPLIERS ========================= */

  {id: 'root.suppliers', type: 'module', value: 'Suppliers', active: true},

  {id: 'root.suppliers.overview', type: 'submodule', value: 'Overview', active: true},
  {id: 'root.suppliers.overview.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.suppliers.overview.suppliers', type: 'widget', value: 'Suppliers (w)', active: true},
  {id: 'root.suppliers.overview.categories', type: 'widget', value: 'Categories (w)', active: true},
  {id: 'root.suppliers.overview.breakdown', type: 'widget', value: 'Breakdown (w)', active: true},
  {id: 'root.suppliers.overview.table', type: 'widget', value: 'Table (w)', active: true},

  {id: 'root.suppliers.new_suppliers', type: 'submodule', value: 'New Suppliers', active: true},
  {id: 'root.suppliers.new_suppliers.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.suppliers.new_suppliers.category_count', type: 'widget', value: 'Category Count (w)', active: true},
  {id: 'root.suppliers.new_suppliers.city_count', type: 'widget', value: 'City Count (w)', active: true},
  {id: 'root.suppliers.new_suppliers.table', type: 'widget', value: 'Table (w)', active: true},
  {id: 'root.suppliers.new_suppliers.breakdown', type: 'widget', value: 'Breakdown (w)', active: true},

  {id: 'root.suppliers.diversity', type: 'submodule', value: 'Diversity', active: true},
  {id: 'root.suppliers.diversity.period_one', type: 'widget', value: 'Period 1 (w)', active: true},
  {id: 'root.suppliers.diversity.period_two', type: 'widget', value: 'Period 2 (w)', active: true},
  {id: 'root.suppliers.diversity.variance', type: 'widget', value: 'Variance (w)', active: true},
  {id: 'root.suppliers.diversity.table', type: 'widget', value: 'Table (w)', active: true},
  {id: 'root.suppliers.diversity.breakdown', type: 'widget', value: 'Breakdown (w)', active: true},

  {id: 'root.suppliers.profile', type: 'submodule', value: 'Profile', active: true, affectsOn: ['root.global_search.suppliers', 'root.global_search.original_suppliers']},
  {id: 'root.suppliers.profile.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.suppliers.profile.details', type: 'widget', value: 'Details (w)', active: true},
  {id: 'root.suppliers.profile.list', type: 'widget', value: 'List (w)', active: true},
  {id: 'root.suppliers.profile.table', type: 'widget', value: 'Table (w)', active: true},
  {id: 'root.suppliers.profile.breakdown', type: 'widget', value: 'Breakdown (w)', active: true},

  /** ========================= SUPPLIERS end ========================= */
  /** ========================= CATEGORIES ========================= */

  {id: 'root.categories', type: 'module', value: 'Categories', active: true},

  {id: 'root.categories.overview', type: 'submodule', value: 'Overview', active: true},
  {id: 'root.categories.overview.org_chart', type: 'widget', value: 'Org Chart (w)', active: true},

  {id: 'root.categories.profile', type: 'submodule', value: 'Profile', active: true, affectsOn: ['root.global_search.categories', 'root.global_search.subcategories']},
  {id: 'root.categories.profile.dashboard', type: 'nav', value: 'Dashboard', active: true},
  {id: 'root.categories.profile.dashboard.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.categories.profile.dashboard.suppliers', type: 'widget', value: 'Suppliers (w)', active: true},
  {id: 'root.categories.profile.dashboard.spend_fragmentation', type: 'widget', value: 'Spend Fragmentation (w)', active: true},
  {id: 'root.categories.profile.dashboard.table', type: 'widget', value: 'Table (w)', active: true},
  {id: 'root.categories.profile.dashboard.mavericks', type: 'widget', value: 'Mavericks (w)', active: true, dependecies: ['root.compliance']},
  {id: 'root.categories.profile.dashboard.compliance', type: 'widget', value: 'Compliance (w)', active: true, dependecies: ['root.compliance']},

  /** ========================= CATEGORIES end ========================= */

  /** ========================= COMPLIANCE ========================= */

  {id: 'root.compliance', type: 'module', value: 'Compliance', active: true, affectsOn: ['root.categories.profile.dashboard.mavericks', 'root.categories.profile.dashboard.compliance']},

  {id: 'root.compliance.overview', type: 'submodule', value: 'Overview', active: true},
  {id: 'root.compliance.overview.impactable_spend', type: 'widget', value: 'Impactable Spend (w)', active: true},
  {id: 'root.compliance.overview.impactable_rate', type: 'widget', value: 'Impactable Rate (w)', active: true},
  {id: 'root.compliance.overview.lost_savings', type: 'widget', value: 'Lost Savings (w)', active: true},
  {id: 'root.compliance.overview.area_chart', type: 'widget', value: 'Area Chart (w)', active: true},
  {id: 'root.compliance.overview.table', type: 'widget', value: 'Table (w)', active: true},

  {id: 'root.compliance.managed', type: 'submodule', value: 'Table (w)', active: true},
  {id: 'root.compliance.managed.spend', type: 'widget', value: 'Spend (w)', active: true},
  {id: 'root.compliance.managed.lost_savings', type: 'widget', value: 'Lost Savings (w)', active: true},
  {id: 'root.compliance.managed.compliance_rate', type: 'widget', value: 'Compliance Rate (w)', active: true},
  {id: 'root.compliance.managed.spend_breakdown', type: 'widget', value: 'Spend Breakdown (w)', active: true},
  {id: 'root.compliance.managed.table', type: 'widget', value: 'Table (w)', active: true},

  {id: 'root.compliance.rogues', type: 'submodule', value: 'Rogues (w)', active: true},
  {id: 'root.compliance.rogues.tiles', type: 'widget', value: 'Tiles (w)', active: true},

  {id: 'root.compliance.tools', type: 'submodule', value: 'Tools (w)', active: true},
  {id: 'root.compliance.tools.edit', type: 'action', value: 'Edit (w)', active: true},

  /** ========================= COMPLIANCE end ========================= */

  /** ========================= GLOBAL SEARCH ========================= */

  {id: 'root.global_search', type: 'module', value: 'Global Search', active: true},
  {id: 'root.global_search.categories', type: 'action', value: 'Categories', active: true, dependencies: ['root.categories.profile']},
  {id: 'root.global_search.subcategories', type: 'action', value: 'Subcategories', active: true, dependencies: ['root.categories.profile']},
  {id: 'root.global_search.suppliers', type: 'action', value: 'Suppliers', active: true, dependencies: ['root.suppliers.profile']},
  {id: 'root.global_search.original_suppliers', type: 'action', value: 'Original Suppliers', active: true, dependencies: ['root.suppliers.profile']},

  /** ========================= GLOBAL SEARCH end ========================= */

  /** ========================= SINGLE ========================= */

  {id: 'root.diversity', type: 'module', value: 'Diversity', active: true},
  {id: 'root.mro', type: 'module', value: 'MRO', active: true},
  {id: 'root.insight_analytics', type: 'module', value: 'Insight Analytics', active: true},
  {id: 'root.analytics', type: 'module', value: 'Analytics', active: true},
  {id: 'root.strategy', type: 'module', value: 'Strategy', active: true},


  /** ========================= SINGLE end ========================= */
]
