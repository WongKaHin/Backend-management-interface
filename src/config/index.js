export default [
    {
        path: '/home',
        name: 'home',
        label: '首頁',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: '用戶管理',
        icon: 'UserOutlined',
        url: '/user/index',
    },
    {
        path: '/other',
        label: '其他',
        icon: 'SettingOutlined',
        children: [
            {
                path: '/other/pageOne',
                name: 'page1',
                label: '頁面1',
                icon: 'SeetingOutlined'
            },
            {
                path: 'other/pageTwo',
                name: 'page2',
                label: '頁面2',
                icon: 'SettingOutlined',
            }
        ]
    }
]