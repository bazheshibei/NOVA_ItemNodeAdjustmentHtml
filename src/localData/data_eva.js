/**
 * [编辑查看审核]
 */

/* eslint-disable */
const obj = {
  'accessDataList': [],
  'adjusmentAuditMapList': [{
    'audit_employeename': '于圣华',
    'audit_remark': '提交审核',
    'audit_result': 0,
    'audit_time': '2021-01-22 15:06:34',
    'gantt_audit_id': '2c9f10b677284cdf017728ea85380074',
    'now_audit_stage': '提交审核'
  }],
  'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
  'adjustment_reason': '更新模板',
  'adjustment_remark': '更新模板',
  'business_type': '大货甘特表汇总',
  'employyeename': '王涛',
  'ganttTemplateList': [{
    'nodeTempleteDetail': [{
      'business_post_id': '2c9f10b66662c55f016662daed1c0001',
      'is_audit_follow': 0,
      'is_branch_calc': 0,
      'is_core_node': 0,
      'is_delete': 1,
      'is_quote': 0,
      'max_section_value': '',
      'min_section_value': '',
      'node_code': 'DH-HTHQ',
      'node_content_type': 'time',
      'node_id': '8a8a8062647e434601647e52916e0008',
      'node_name': '面料合同回签',
      'node_number': 23,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790033',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 1,
      'sys_clac_formula': ' ${MLHTXD1}+2',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662daed1c0001',
      'is_audit_follow': 0,
      'is_branch_calc': 0,
      'is_core_node': 0,
      'is_delete': 1,
      'is_quote': 0,
      'max_section_value': '${DH-KC }-1',
      'min_section_value': '${DH-SPQR}',
      'node_code': 'MLQBDC',
      'node_content_type': 'time',
      'node_id': '2c915e10742a049c01742dc82e890089',
      'node_name': '面料全部到厂',
      'node_number': 24,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790034',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662daed1c0001',
      'is_audit_follow': 0,
      'is_branch_calc': 0,
      'is_core_node': 0,
      'is_delete': 1,
      'is_quote': 0,
      'max_section_value': '${DH-SPDC}',
      'min_section_value': '${DH-SPQR}',
      'node_code': 'MLYH',
      'node_content_type': 'time',
      'node_id': '8a8a806273ea5f870173eaccc58d0000',
      'node_name': '面料验货',
      'node_number': 25,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790035',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662daed1c0001',
      'is_audit_follow': 0,
      'is_branch_calc': 0,
      'is_core_node': 0,
      'is_delete': 1,
      'is_quote': 1,
      'max_section_value': '${DH-SPDC}',
      'min_section_value': '',
      'node_code': 'DH-SPQR',
      'node_content_type': 'time',
      'node_id': '8a8a8062647e434601647e53e22b000a',
      'node_name': '首批确认',
      'node_number': 28,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790038',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662daed1c0001',
      'is_audit_follow': 0,
      'is_branch_calc': 0,
      'is_core_node': 0,
      'is_delete': 1,
      'is_quote': 1,
      'max_section_value': '${DH-KC }-1',
      'min_section_value': '${DH-SPQR}',
      'node_code': 'DH-SPDC',
      'node_content_type': 'time',
      'node_id': '8a8a8062647e434601647e53e270000b',
      'node_name': '一批到厂',
      'node_number': 29,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790039',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662d7a9db0000',
      'is_audit_follow': 1,
      'is_branch_calc': 0,
      'is_core_node': 1,
      'is_delete': 1,
      'is_quote': 0,
      'max_section_value': '${GCJQ}',
      'min_section_value': '${KHXDRQ}',
      'node_code': 'APPQR',
      'node_content_type': 'time',
      'node_id': '8a8a806273ea5f870173ead01e6c0001',
      'node_name': 'APP确认',
      'node_number': 210,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d470020',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }, {
      'business_post_id': '2c9f10b66662c55f016662d7a9db0000',
      'is_audit_follow': 1,
      'is_branch_calc': 0,
      'is_core_node': 1,
      'is_delete': 1,
      'is_quote': 1,
      'max_section_value': '${GCJQ}',
      'min_section_value': '${KHXDRQ}',
      'node_code': 'DSPPQR',
      'node_content_type': 'time',
      'node_id': '8a8a806273ea5f870173ead01f730002',
      'node_name': '单色PP确认',
      'node_number': 220,
      'node_template_detail_id': '2c9f10b677284cdf017728d36d470021',
      'node_template_id': '2c9f10b677284cdf017728d36d46001c',
      'submit_type': 2,
      'sys_clac_formula': '',
      'sys_describe': null,
      'verification_remark': ''
    }],
    'node_template_id': '2c9f10b677284cdf017728d36d46001c',
    'template_name': '【大货甘特表】 通用 通用 录单人组 通用 通用 甘特表模板'
  }],
  'gantt_type': '1',
  'itemSummaryDataList': [{
    'adjusmentDetailList': [{
      'adjustment_audit_result': 2,
      'adjustment_detail_explain': '',
      'adjustment_detail_id': '2c9f10b677284cdf017728ea8522006f',
      'adjustment_detail_reason': null,
      'adjustment_detail_type': 1,
      'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
      'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
      'adjustment_type': 1,
      'after_plan_enddate': '2021-01-21',
      'before_plan_enddate': '',
      'final_plan_enddate': null,
      'is_finaly': 1,
      'is_quote': 0,
      'item_gantt_audit_id': null,
      'item_node_id': null,
      'item_team_id': null,
      'max_plant_enddate': '',
      'max_section_value': '',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '',
      'node_audit_detail_id': null,
      'node_id': '8a8a8062647e434601647e52916e0008',
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790033',
      'sys_clac_formula': ' ${MLHTXD1}+2',
      'verification_remark': ''
    }, {
      'adjustment_audit_result': 2,
      'adjustment_detail_explain': '',
      'adjustment_detail_id': '2c9f10b677284cdf017728ea85250070',
      'adjustment_detail_reason': null,
      'adjustment_detail_type': 1,
      'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
      'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
      'adjustment_type': 1,
      'after_plan_enddate': '2021-01-22',
      'before_plan_enddate': '',
      'final_plan_enddate': null,
      'is_finaly': 1,
      'is_quote': 0,
      'item_gantt_audit_id': null,
      'item_node_id': null,
      'item_team_id': null,
      'max_plant_enddate': '',
      'max_section_value': '${DH-KC }-1',
      'min_plant_enddate': '2021-01-21',
      'min_section_value': '${DH-SPQR}',
      'node_audit_detail_id': null,
      'node_id': '2c915e10742a049c01742dc82e890089',
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790034',
      'sys_clac_formula': '',
      'verification_remark': ''
    }, {
      'adjustment_audit_result': 2,
      'adjustment_detail_explain': '',
      'adjustment_detail_id': '2c9f10b677284cdf017728ea85280071',
      'adjustment_detail_reason': null,
      'adjustment_detail_type': 1,
      'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
      'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
      'adjustment_type': 1,
      'after_plan_enddate': '2021-01-22',
      'before_plan_enddate': '',
      'final_plan_enddate': null,
      'is_finaly': 1,
      'is_quote': 0,
      'item_gantt_audit_id': null,
      'item_node_id': null,
      'item_team_id': null,
      'max_plant_enddate': '',
      'max_section_value': '${DH-SPDC}',
      'min_plant_enddate': '2021-01-21',
      'min_section_value': '${DH-SPQR}',
      'node_audit_detail_id': null,
      'node_id': '8a8a806273ea5f870173eaccc58d0000',
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790035',
      'sys_clac_formula': '',
      'verification_remark': ''
    }, {
      'adjustment_audit_result': 2,
      'adjustment_detail_explain': '',
      'adjustment_detail_id': '2c9f10b677284cdf017728ea852b0072',
      'adjustment_detail_reason': null,
      'adjustment_detail_type': 1,
      'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
      'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
      'adjustment_type': 1,
      'after_plan_enddate': '2021-01-21',
      'before_plan_enddate': '',
      'final_plan_enddate': null,
      'is_finaly': 1,
      'is_quote': 1,
      'item_gantt_audit_id': null,
      'item_node_id': null,
      'item_team_id': null,
      'max_plant_enddate': '',
      'max_section_value': '${DH-SPDC}',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '',
      'node_audit_detail_id': null,
      'node_id': '8a8a8062647e434601647e53e22b000a',
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790038',
      'sys_clac_formula': '',
      'verification_remark': ''
    }, {
      'adjustment_audit_result': 2,
      'adjustment_detail_explain': '不分批',
      'adjustment_detail_id': '2c9f10b677284cdf017728ea852d0073',
      'adjustment_detail_reason': null,
      'adjustment_detail_type': 1,
      'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
      'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
      'adjustment_type': 1,
      'after_plan_enddate': '/',
      'before_plan_enddate': '',
      'final_plan_enddate': null,
      'is_finaly': 1,
      'is_quote': 1,
      'item_gantt_audit_id': null,
      'item_node_id': null,
      'item_team_id': null,
      'max_plant_enddate': '',
      'max_section_value': '${DH-KC }-1',
      'min_plant_enddate': '2021-01-21',
      'min_section_value': '${DH-SPQR}',
      'node_audit_detail_id': null,
      'node_id': '8a8a8062647e434601647e53e270000b',
      'node_template_detail_id': '2c9f10b677284cdf017728d36d790039',
      'sys_clac_formula': '',
      'verification_remark': ''
    }],
    'adjustment_id': '8949a167d75a4aa2847701254b7f9d14',
    'adjustment_summary_id': '2c9f10b677284cdf017728ea8521006e',
    'audit_status': 1,
    'color_id': null,
    'color_name': null,
    'employeename': null,
    'is_change_template': 1,
    'is_thread': 0,
    'itemNodeDataList': [{
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-25',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac6b02a7',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'ZQYH',
      'node_id': '2c915e10742a049c01742f30ac1000a2',
      'node_name': '中期验货',
      'plan_enddate': '2021-01-25',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'2c915e10742a049c01742f30ac1000a2\':\'中期验货\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-21',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 2,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac7202a8',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 5,
      'node_code': 'SJCK',
      'node_id': '2c915e10742a049c01742f2ee05200a1',
      'node_name': '首件查看',
      'plan_enddate': '2021-01-21',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'2c915e10742a049c01742f2ee05200a1\':\'首件查看\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-28',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac7902a9',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'MQYH',
      'node_id': '2c915e10742a049c01742f318d1800a3',
      'node_name': '末期验货',
      'plan_enddate': '2021-01-28',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'2c915e10742a049c01742f318d1800a3\':\'末期验货\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-29',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac4e02a3',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'GCFH',
      'node_id': '2c915e10742a049c01742f40034700ac',
      'node_name': '工厂发货',
      'plan_enddate': '2021-01-29',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'2c915e10742a049c01742f40034700ac\':\'工厂发货\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '/',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677197b98017719f18d2100ae',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677197b98017719f18d2800af',
      'item_team_id': '2c9f10b66662c55f016662d7a9db0000',
      'max_plant_enddate': '',
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'APPQR',
      'node_id': '8a8a806273ea5f870173ead01e6c0001',
      'node_name': 'APP确认',
      'plan_enddate': '/',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a806273ea5f870173ead01e6c0001\':\'APP确认\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-25',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 1,
      'item_gantt_detail_id': '2c9f10b677197b98017719f18d2100ae',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677197b98017719f18d2c00b0',
      'item_team_id': '2c9f10b66662c55f016662d7a9db0000',
      'max_plant_enddate': '',
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'DSPPQR',
      'node_id': '8a8a806273ea5f870173ead01f730002',
      'node_name': '单色PP确认',
      'plan_enddate': '2021-01-25',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a806273ea5f870173ead01f730002\':\'单色PP确认\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-20',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 2,
      'is_final': null,
      'is_quote': 1,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac5602a4',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 5,
      'node_code': 'DH-KC',
      'node_id': '8a8a8062647e434601647e640df90034',
      'node_name': '开裁',
      'plan_enddate': '2021-01-20',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a8062647e434601647e640df90034\':\'开裁\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-20',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 2,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac5d02a5',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'DH-CQH ',
      'node_id': '8a8a8062647e434601647e61cf7f0030',
      'node_name': '产前会 ',
      'plan_enddate': '2021-01-20',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a8062647e434601647e61cf7f0030\':\'产前会 \'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-21',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 2,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac6402a6',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'DH-SJ1',
      'node_id': '8a8a8062647e434601647e640e400035',
      'node_name': '上机',
      'plan_enddate': '2021-01-21',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a8062647e434601647e640e400035\':\'上机\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-28',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 0,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677276f0a0177281fa9d9029f',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677276f0a0177281fac8002aa',
      'item_team_id': '2c9f10b66662c55f016662db34410003',
      'max_plant_enddate': null,
      'max_section_value': '${GCJQ}',
      'min_plant_enddate': null,
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 0,
      'node_code': 'DH-XJ',
      'node_id': '8a8a8062647e434601647e65ab35003a',
      'node_name': '下机',
      'plan_enddate': '2021-01-28',
      'submit_type': 2,
      'sys_clac_formula': '',
      'titnode': '{\'8a8a8062647e434601647e65ab35003a\':\'下机\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-20',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 1,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677197b98017719f0d6bd00aa',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677197b98017719f0d6c400ab',
      'item_team_id': '2c9f10b66662c55f016662d7a9db0000',
      'max_plant_enddate': '',
      'max_section_value': '',
      'min_plant_enddate': '',
      'min_section_value': '',
      'node_audit_status': 5,
      'node_code': 'ZLTBLDR',
      'node_id': '2c9f10b67511b15c01754e0b36511d2a',
      'node_name': '资料提报录单人',
      'plan_enddate': '2021-01-20',
      'submit_type': 1,
      'sys_clac_formula': '${XMGJSJ}+1',
      'titnode': '{\'2c9f10b67511b15c01754e0b36511d2a\':\'资料提报录单人\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-25',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 1,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677197b98017719f0d6bd00aa',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677197b98017719f0d6c800ac',
      'item_team_id': '2c9f10b66662c55f016662d7a9db0000',
      'max_plant_enddate': '2021-01-30',
      'max_section_value': '${KHXDRQ}+10',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 5,
      'node_code': 'GTBJHTB:TCQ',
      'node_id': '8a8a80627278206d01727829635c0000',
      'node_name': '甘特表计划提报:投产前',
      'plan_enddate': '2021-01-25',
      'submit_type': 1,
      'sys_clac_formula': '${KHXDRQ}+5',
      'titnode': '{\'8a8a80627278206d01727829635c0000\':\'甘特表计划提报:投产前\'}',
      'verification_remark': ''
    }, {
      'abnormal_reason': null,
      'adjusment_status': 0,
      'change_plan_time': null,
      'change_remaark': null,
      'change_time': null,
      'first_plant_enddate': '2021-01-30',
      'frist_plan_time': null,
      'is_change': null,
      'is_complete': 1,
      'is_final': null,
      'is_quote': 0,
      'item_gantt_detail_id': '2c9f10b677197b98017719f0d6bd00aa',
      'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
      'item_node_abnormal': null,
      'item_node_id': '2c9f10b677197b98017719f0d6cb00ad',
      'item_team_id': '2c9f10b66662c55f016662d7a9db0000',
      'max_plant_enddate': '',
      'max_section_value': '${DH-KC}-2',
      'min_plant_enddate': '2021-01-20',
      'min_section_value': '${KHXDRQ}',
      'node_audit_status': 5,
      'node_code': 'GTBJHTB:YPSCJH',
      'node_id': '8a8a80627278206d0172782965fb0001',
      'node_name': '甘特表计划提报:预排生产计划',
      'plan_enddate': '2021-01-30',
      'submit_type': 1,
      'sys_clac_formula': '${KHXDRQ}+10',
      'titnode': '{\'8a8a80627278206d0172782965fb0001\':\'甘特表计划提报:预排生产计划\'}',
      'verification_remark': ''
    }],
    'item_gantt_detail_id': '2c9f10b677197b98017719f0d6bd00aa',
    'item_gantt_id': '2c9f10b677197b98017719f0d6bb00a9',
    'material_id': null,
    'material_name': null,
    'nodeAuditDetailMapList': [],
    'node_charge_person': null,
    'node_template_id': '2c9f10b677284cdf017728d36d46001c',
    'plant_order_id': null,
    'provider_name': null,
    'short_name': null
  }],
  'itemSummaryItemData': {
    'create_time': '2021-01-19 14:30:11',
    'creator': '于圣华',
    'deliver_date': '2021-01-30',
    'dress_total': 36,
    'group_name': '录单人组',
    'itemInformation': '录单人组 > 通用 > dhcs0001 > 22夏 > none > 棉服 > 标准版 > 系统验收测试款式',
    'itemTeam': [{
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '服装业务'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '面料业务'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '技术工艺'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': 'QC跟单'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '开发业务'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '设计'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '技术版型'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '技术单耗'
    }, {
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'post_name': '录单人'
    }],
    'item_custom_order_id': '2c9f10b6771859b7017719562210029b',
    'kf_order_time': '2021-01-20',
    'kf_receive_material_time': null,
    'order_time': '2021-01-20',
    'order_type': '普通',
    'plantOrder': [{
      'audit_status': 3,
      'deliver_date': '2021-01-29',
      'employeeid': '26c4ff33f8774d93bff52d13166f08ab',
      'employeename': '于圣华',
      'item_gantt_id': '2c9f10b677276f0a0177281ec5df028a',
      'node_name': null,
      'order_status': '3',
      'plant_id': 'eb8771286dbb47b5a8f99ab1baba9424',
      'plant_order_id': '2c9f10b677197b9801771d9813b1094c',
      'provider_name': '库存',
      'short_name': '库存'
    }],
    'provider_name': null,
    'short_name': null,
    'styleBom': []
  },
  'item_id': '2c9f10b6771859b701771886efc80202',
  'item_name': 'dhcs0001',
  'nextAuditMap': {
    'auditEmployeeMap': [],
    'auditNodeMap': {
      'flow_id': '2c9f10b6771d9f02017723c4542e0e51',
      'flow_num': 2,
      'is_multiple': 0,
      'node_code': 'ZJBSH',
      'node_handle_type': 3,
      'node_id': '2c9f10b6771d9f02017723c4542e0e53',
      'node_name': '总经办审核',
      'node_role_id': '2c9f10b6771d9f73017723be6b60002c',
      'node_type': 3,
      'up_node_id': '2c9f10b6771d9f02017723c4542e0e52'
    },
    'nextAuditNode': 2,
    'now_audit_stage': '2c9f10b6771d9f02017723c4542e0e52'
  },
  'nodeData': [{
    '8a8a8062647e434601647e52916e0008': '面料合同回签'
  }, {
    '2c915e10742a049c01742dc82e890089': '面料全部到厂'
  }, {
    '8a8a806273ea5f870173eaccc58d0000': '面料验货'
  }, {
    '8a8a8062647e434601647e53e22b000a': '首批确认'
  }, {
    '8a8a8062647e434601647e53e270000b': '一批到厂'
  }, {
    '8a8a806273ea5f870173ead01e6c0001': 'APP确认'
  }, {
    '8a8a806273ea5f870173ead01f730002': '单色PP确认'
  }, {
    '2c915e10742a049c01742f30ac1000a2': '中期验货'
  }, {
    '2c915e10742a049c01742f2ee05200a1': '首件查看'
  }, {
    '2c915e10742a049c01742f318d1800a3': '末期验货'
  }, {
    '2c915e10742a049c01742f40034700ac': '工厂发货'
  }, {
    '8a8a8062647e434601647e640df90034': '开裁'
  }, {
    '8a8a8062647e434601647e61cf7f0030': '产前会 '
  }, {
    '8a8a8062647e434601647e640e400035': '上机'
  }, {
    '8a8a8062647e434601647e65ab35003a': '下机'
  }, {
    '2c9f10b67511b15c01754e0b36511d2a': '资料提报录单人'
  }, {
    '8a8a80627278206d01727829635c0000': '甘特表计划提报:投产前'
  }, {
    '8a8a80627278206d0172782965fb0001': '甘特表计划提报:预排生产计划'
  }],
  'node_business_type_id': '8a8a806271f31c580171f32372f90003'
}

export default {
  '编辑查看审核': obj
}
