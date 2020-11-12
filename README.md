## code-push 配置
### ios 配置
- 进入ios项目，在info.plist文件中配置热更新的服务器的路径
``` xml
  <key>CodePushServerURL</key>
	<string>http://119.27.181.101:3000</string>
```
### android 配置
- 问题: Could not resolve project :react-native-code-push. 
  - 在android 项目的 setting.gradle 文件中，添加以下配置
```
  apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
  include ':app'

  // 以下为新增配置
  include ':app', ':react-native-code-push'

  project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

- 在 app/res/values/string.xml 文件，配置热更新的key
```xml
<resources>
    <string name="app_name">{app_name}</string>
    <string name="CodePushDeploymentKey">{key}</string> // 配置code-push生成的key
</resources>
```