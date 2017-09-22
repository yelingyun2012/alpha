<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'
=======
/**
 * 引入依赖项
 */
import Vue from 'vue'
import Vuex from 'vuex'
/**
 * 导入依赖文件
 */
import user from './modules/user'
import permission from './modules/permission'
>>>>>>> ab8373961b3980bf3de671644cb464a66e7b2762

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
<<<<<<< HEAD

  }
})
=======
    user,
    permission
  }
})

export default store

>>>>>>> ab8373961b3980bf3de671644cb464a66e7b2762
