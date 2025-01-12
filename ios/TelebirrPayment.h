
#import <React/RCTBridgeModule.h>
#import "EthiopiaPaySDK/EthiopiaPayManager.h"

@interface TelebirrPaymentModule : NSObject <RCTBridgeModule, EthiopiaPayManagerDelegate>

@end
