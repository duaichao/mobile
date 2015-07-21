package cn.dac.app;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		//super.setIntegerProperty("loadUrlTimeoutValue", 300000);
		
		getWindow().setBackgroundDrawable(null);
		
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("splashscreen", R.drawable.splash);
        // 3s后splash关闭
		super.loadUrl(Config.getStartUrl(), 3000);
	}

}
