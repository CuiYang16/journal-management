import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件
import iconfont from '@/icons/iconfont.js'
// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('iconfont', iconfont)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
