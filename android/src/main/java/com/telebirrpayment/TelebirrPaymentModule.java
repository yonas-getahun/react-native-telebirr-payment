package com.telebirrpayment;

import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
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
                   
                        promise.resolve( "Error code: " + code + ", Message: " + errMsg);
                   

                    // Display Toast as feedback
                    //Toast.makeText(getReactApplicationContext(), "Code: " + code + ", Message: " + errMsg, Toast.LENGTH_SHORT).show();
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
