package com.telebirrpayment;

import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.huawei.ethiopia.pay.sdk.api.core.data.PayInfo;
import com.huawei.ethiopia.pay.sdk.api.core.utils.PaymentManager;
import com.huawei.ethiopia.pay.sdk.api.core.listener.PayCallback;
import androidx.fragment.app.FragmentActivity;

public class TelebirrPaymentModule extends ReactContextBaseJavaModule {

    private static final String TAG = "TelebirrPaymentModule";

    public TelebirrPaymentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TelebirrPaymentModule";
    }

    @ReactMethod
    public void startPay(String appId, String shortCode, String receiveCode, Promise promise) {
        try {
           final PayInfo payInfo = new PayInfo.Builder()
                    .setAppId(appId)
                    .setShortCode(shortCode)
                    .setReceiveCode(receiveCode)
                    .build();

            // Set the PayCallback listener to handle the result
            PaymentManager.getInstance().setPayCallback(new PayCallback() {
                @Override
                public void onPayCallback(int code, String errMsg) {
                    Log.d(TAG, "onPayCallback: code " + code + " errMsg " + errMsg);

                    // Resolve the promise with code and message
                    WritableMap result = new WritableNativeMap();
                    result.putInt("code", code);
                    result.putString("message", errMsg);
                    promise.resolve(result);
                   
                }
            });

            if (getCurrentActivity() instanceof FragmentActivity) {
                FragmentActivity activity = (FragmentActivity) getCurrentActivity();
                PaymentManager.getInstance().pay(activity, payInfo);
            } else {
                promise.reject("ACTIVITY_ERROR", "The current activity is not a FragmentActivity.");
            }
        } catch (Exception e) {
            promise.reject("PAYMENT_ERROR", "Error initiating payment: " + e.getMessage());
        }
    }
}
