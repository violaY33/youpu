export default function infiniteScroll(el, triggerDis, cb, isEnd) {
  let isLoading = false;
  let clientHeight = window.innerHeight;

  window.onresize = () => {
    clientHeight = window.innerHeight;
  }
  window.onscroll = () => {
    let elBottom = el.getBoundingClientRect().bottom;
    let curDis = elBottom - clientHeight;
    if (!isLoading && !isEnd && curDis <= triggerDis) {
      isLoading = true;
      cb().then(res => {
        isLoading = false;
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
