import 'package:foxy/provider/setting.dart';
import 'package:foxy/service/service.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'loading.g.dart';

@riverpod
class LoadingLogsNotifier extends _$LoadingLogsNotifier {
  @override
  List<String> build() {
    loading();
    return ['加载中...'];
  }

  Future<void> loading() async {
    final setting = await ref.read(settingNotifierProvider.future);
    try {
      await ServiceInitializer.ensureInitialized(
        host: setting.host,
        port: setting.port,
        username: setting.username,
        password: setting.password,
        database: setting.database,
      );
      state = [...state, '初始化mysql连接'];
    } on Exception catch (e) {
      state = [...state, e.toString()];
    }
    await Future.delayed(const Duration(seconds: 5));
    state = [...state, '加载完成'];
  }
}
