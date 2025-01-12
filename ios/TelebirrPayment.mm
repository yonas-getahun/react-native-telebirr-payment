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

     dispatch_async(dispatch_get_main_queue(), ^{
     self.resolve = resolve;
     self.reject = reject;
    
    // Initialize EthiopiaPaySDK
    EthiopiaPayManager *manager = [EthiopiaPayManager sharedManager];
    manager.delegate =  self;
   
    // Start payment
    [manager startPayWithAppId:appId shortCode:shortCode receiveCode:receiveCode returnAppScheme:returnAppScheme];
    });
}

// EthiopiaPayManagerDelegate callback for payment result
- (void)payResultCallbackWithCode:(NSInteger)code msg:(NSString *)msg {
    dispatch_async(dispatch_get_main_queue(), ^{
          if (self.resolve) {
              NSDictionary *result = @{@"code": @(code), @"message": msg};
              self.resolve(result);
          }
          
          self.resolve = nil;
          self.reject = nil;
      });    
}


@end
