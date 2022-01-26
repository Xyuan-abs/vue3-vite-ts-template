import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // do something

  next()
})

router.afterEach(() => {
  NProgress.done()
})
