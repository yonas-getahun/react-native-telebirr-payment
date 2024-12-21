//
//  TelebirrPayment.m
//
//  Created by Yonas Getahun on 20/11/2024.
//

#import "TelebirrPayment.h"

@interface TelebirrPaymentModule ()

// Properties to store resolve/reject blocks
@property (nonatomic, copy) RCTPromiseResolveBlock resolve;
@property (nonatomic, copy) RCTPromiseRejectBlock reject;

@end

@implementation TelebirrPaymentModule

// Expose this module to React Native
RCT_EXPORT_MODULE();

// Method to retrieve the URL scheme dynamically
- (NSString *)getAppURLScheme {
  NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
  NSArray *urlTypes = infoDict[@"CFBundleURLTypes"];

  if (urlTypes && urlTypes.count > 0) {
    NSDictionary *urlTypeDict = urlTypes[0];
    NSArray *urlSchemes = urlTypeDict[@"CFBundleURLSchemes"];

    if (urlSchemes && urlSchemes.count > 0) {
      return urlSchemes[0]; // Return the first URL scheme found
    }
  }

  return nil; // Return nil if no URL scheme is found
}

// Method to trigger the payment
RCT_EXPORT_METHOD(startPay:(NSString *)appId
                  shortCode:(NSString *)shortCode
                  receiveCode:(NSString *)receiveCode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
        
     // Get the URL scheme dynamically
    NSString *returnAppScheme = [self getAppURLScheme];
    
    if (!returnAppScheme) {
        reject(@"NO_URL_SCHEME", @"No URL scheme found in Info.plist", nil);
        return;
    }

    // Initialize EthiopiaPaySDK
    EthiopiaPayManager *manager = [EthiopiaPayManager sharedManager];
    manager.delegate = self;
    
    // Save the resolve and reject blocks for later use in the callback
    self.resolve = resolve;
    self.reject = reject;

    // Start payment
    [manager startPayWithAppId:appId shortCode:shortCode receiveCode:receiveCode returnAppScheme:returnAppScheme];
}

// EthiopiaPayManagerDelegate callback for payment result
- (void)payResultCallbackWithCode:(NSInteger)code msg:(NSString *)msg {
    if (code == 0) { // Assuming 0 is success
        if (self.resolve) {
            self.resolve(@{ @"code": @(code), @"msg": msg });
        }
    } else {
        if (self.reject) {
            self.reject([NSString stringWithFormat:@"%ld", (long)code], msg, nil);
        }
    }
    
    // Clean up the resolve/reject blocks
    self.resolve = nil;
    self.reject = nil;
}


@end
