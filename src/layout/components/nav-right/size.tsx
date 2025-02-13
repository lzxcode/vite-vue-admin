import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultData from '@/config/default-data'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const navSetting = defaultData.navSetting

    type SizeSelect = { value: string; label: string }
    const sizeSelect: SizeSelect[] = [
      {
        value: 'default',
        label: 'default',
      },
      {
        value: 'large',
        label: 'large',
      },
      {
        value: 'small',
        label: 'small',
      },
    ]

    // 修改组件大小
    const setSize = (e: string) => {
      navSetting.size = e
      localStorage.setItem('navSetting', JSON.stringify(navSetting))
      ElMessage.success('修改成功！即将刷新网页')
      setTimeout(() => {
        window.location.reload()
      }, 800)
    }
    const slots = {
      dropdown: () => {
        return (
          <el-dropdown-menu class="user-dropdown">
            {sizeSelect.map((item: SizeSelect, index: number) => {
              return (
                <el-dropdown-item
                  key={'locale' + index}
                  onClick={() => {
                    setSize(item.value)
                  }}
                >
                  <div
                    style={{
                      color:
                        navSetting.size == item.value
                          ? 'var(--el-color-primary)'
                          : '#666',
                    }}
                  >
                    <i
                      class="language_r"
                      style={
                        navSetting.size == item.value
                          ? {
                              borderColor: 'var(--el-color-primary)',
                              background: 'var(--el-color-primary)',
                            }
                          : {}
                      }
                    ></i>
                    {t(item.label)}
                  </div>
                </el-dropdown-item>
              )
            })}
          </el-dropdown-menu>
        )
      },
    }

    return () => (
      <div class="item">
        <el-dropdown class="avatar-container" trigger="hover" v-slots={slots}>
          <div class={[defaultData.iconfont, 'vitefont-size']}></div>
        </el-dropdown>
      </div>
    )
  },
})
