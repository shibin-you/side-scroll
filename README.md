# side-scroll
侧边导航
```html
<ul class="side-bar">
  <li class="side-bar-item active">标题1</li>
  <li class="side-bar-item">标题2</li>
  <li class="side-bar-item">标题3</li>
  <li class="side-bar-item">标题4</li>
  <li class="side-bar-item">标题5</li>
  <li class="side-bar-item">标题6</li>
</ul>
<ul class="content">
  <li class="content-item">1</li>
  <li class="content-item">2</li>
  <li class="content-item">3</li>
  <li class="content-item">4</li>
  <li class="content-item">5</li>
  <li class="content-item" style="height:1000px">6</li>
</ul>
<script src="./dist/side-bar-scroll.min.js" charset="utf-8"></script>
```
```js
new SideBarScroll({
  sideBarItems:document.getElementsByClassName('side-bar-item'),
  contentItems:document.getElementsByClassName('content-item')
})
```
