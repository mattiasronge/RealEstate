import Menu from '../../data/menu'
//define the state
const state = {
    data: Menu.data,
    searchData: []
}

// getters
const getters = {
   
}

// mutations
const mutations = {
    /**
    * 
    * Mutations hanterar states.
    * Dem kallas via actions. All data kommer att bindas via parametrar.
    */
    searchTerm: (state, term) => {//Den här mutationen ändrar stat-searchData och kallas från admin-sidans filtrerings menu
        let items = [];
        term = term.toLowerCase();
        state.data.filter(menuItems => {
            if(menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link'){
              items.push(menuItems);
            }
            if(!menuItems.children) return false
              menuItems.children.filter(subItems => {
                if(subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
                  subItems.icon = menuItems.icon
                  items.push(subItems);
                }
                if(!subItems.children) return false
                subItems.children.filter(suSubItems => {
                  if(suSubItems.title.toLowerCase().includes(term)) {
                    suSubItems.icon = menuItems.icon
                    items.push(suSubItems);
                  }
                })
            })
            state.searchData = items
        });
    },
    setNavActive: (state, item) => {
        if (!item.active) {
          state.data.forEach(a => {
            if (state.data.includes(item))
              a.active = false
            if (!a.children) return false
            a.children.forEach(b => {
              if (a.children.includes(item)) {
                b.active = false
              }
            })
          });
        }
        item.active = !item.active
    },
    setActiveRoute:(state, item) => {
       state.data.filter(menuItem => {
          if (menuItem != item)
            menuItem.active = false
          if (menuItem.children && menuItem.children.includes(item))
            menuItem.active = true
          if (menuItem.children) {
            menuItem.children.filter(submenuItems => {
              if (submenuItems.children && submenuItems.children.includes(item)) {
                menuItem.active = true
                submenuItems.active = true
              }
            })
          }
        })
    }
};


// actions
/**
 *Actions hanterar begäran från backend
 */
const actions = {
    searchTerm: (context, term) => {
        context.commit('searchTerm',term)
    },
    setNavActive: (context, item) => {
        context.commit('setNavActive',item)
    },
    setActiveRoute:(context, item) => {
        context.commit('setActiveRoute', item)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}