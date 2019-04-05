import Scroll from './util/scroll'
import {
  removeClass,
  addClass
} from './util/dom'

class SideBarScroll {
  constructor(opts) {
    initScoll(opts, this)
    this.currentIndex = 0
  }
  resetItems(opts) {
    initScoll(opts, this)
  }
}

function initScoll(opts, sideBarScroll) {
  if (!opts.sideBarItems || !opts.contentItems) {
    return
  }
  sideBarScroll.sideBarItems = opts.sideBarItems
  sideBarScroll.contentItems = opts.contentItems
  initListHeight(sideBarScroll)
  sideBarScroll.currentIndex = opts.currentIndex ? opts.currentIndex : 0
  sideBarScroll.scroll = new Scroll({
    el: opts.el,
    scrollListener() {
      let currentIndex = sideBarScroll.currentIndex
      let sideBarItems = sideBarScroll.sideBarItems
      let listHeight = sideBarScroll.listHeight
      for (var i = 0, len = listHeight.length; i < len; i++) {
        if (this.scrollY >= listHeight[i] && this.scrollY < listHeight[i + 1]) {
          removeClass(sideBarItems[currentIndex], 'side-bar-active')
          sideBarScroll.currentIndex = currentIndex = i
          addClass(sideBarItems[currentIndex], 'side-bar-active')
          return
        }
        if (!listHeight[i + 1]) {
          removeClass(sideBarItems[currentIndex], 'side-bar-active')
          sideBarScroll.currentIndex = currentIndex = i
          addClass(sideBarItems[currentIndex], 'side-bar-active')
          return
        }
      }
      if (typeof opts.sideBarScroll === 'function') {
        opts.scrollListener.call(sideBarScroll)
      }
    }
  })
}

function initListHeight(sideBarScroll) {
  sideBarScroll.listHeight = []
  let height = 0
  let contentItems = sideBarScroll.contentItems
  let sideBarItems = sideBarScroll.sideBarItems
  for (var i = 0, len = contentItems.length; i < len; i++) {
    let item = contentItems[i]
    let sideBar = sideBarItems[i]
    sideBarScroll.listHeight.push(height)
    height += item.clientHeight
    sideBar.setAttribute('data-index', i)
    sideBarItems[i].onclick = function() {
      var index = this.getAttribute('data-index')
      sideBarScroll.scroll.scrollToEl(contentItems[index])
    }
  }
}
export default SideBarScroll
