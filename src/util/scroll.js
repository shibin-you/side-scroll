class Scroll {
  constructor(opts) {
    this.opts = opts
    if (!opts || !opts.el) {
      this.el = window
    } else {
      this.el = opts.el
    }
    this.scrollY = this._getNowTop()
    this.el.onscroll = () => {
      this._scroll.call(this)
    }
  }

  _scroll() {
    this.scrollY = this._getNowTop.call(this)
    this.opts.scrollListener.call(this)
  }

  _getNowTop() {
    return this.el === window ? document.body.scrollTop + document.documentElement.scrollTop : this.el.scrollTop
  }

  scrollTo(position, time, num) {
    if (!time && time !== 0) {
      time = 300
    }
    if (!num) {
      num = 20
    }
    if (time === 0) {
      this.el.scrollTo(0, position)
      return
    }
    var nowTop = this._getNowTop.call(this)
    var spacingInex = time / num
    var everTop = (position - nowTop) / spacingInex;
    var scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--
        nowTop += everTop

        this.el.scrollTo(0, nowTop)
      } else {
        clearInterval(scrollTimer)
        if (this.endCallback) {
          this.endCallback()
        }
      }
    }, num)
  }
  scrollToEl(el, time, num) {
    this.scrollTo(el.offsetTop, time, num)
  }
  scrollToTop(time, num) {
    this.scrollTo(0, time, num)
  }
  scrollToBottom(time, num) {
    let to = this.el === window ? document.body.scrollHeight : this.el.scrollHeight
    this.scrollTo(to, time, num)
  }

  scrollEnd(cb) {
    if (typeof cb === 'function') {
      this.endCallback = cb
      return
    }
    this.endCallback = null
  }
}
export default Scroll
