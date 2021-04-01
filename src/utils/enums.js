
//status: 0未分配, 1待生产, 2待发货, 3已发货/已完成, 4生产完成, 5物流撤回
export var orderStatus = Object.freeze({
  NOT_ASSIGN: {id:0, title:'未分配'},
  PRODUCE: {id:1, title:'待生产'},
  WULIU: {id:2, title:'待发货'},
  COMPLETE: {id:3, title:'已发货'},
  PRODUCE_FINISHED: {id:4, title:'已生产'},
  WULIU_REVOKE: {id:5, title:'物流撤回'}
})

//wuliuStatus: 0装车中, 1已发货, 2已撤回
export var wuliuStatus = Object.freeze({
  LOADING: {id:0, title:'装车中'},
  FINISHED: {id:1, title:'已发货'},
  REVOKED: {id:2, title:'已撤回'}
})
