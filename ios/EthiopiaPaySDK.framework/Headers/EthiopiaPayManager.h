//
//  EthiopiaPayManager.h
//  EthiopiaPaySDK
//
//  Created by Duo on 2024/1/9.
//  Copyright © 2024 Huawei. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol EthiopiaPayManagerDelegate <NSObject>

@required
/// 回调支付结果的代理方法
- (void)payResultCallbackWithCode:(NSInteger)code msg:(NSString *)msg;

@end

@interface EthiopiaPayManager : NSObject

@property (nonatomic, weak) id<EthiopiaPayManagerDelegate> delegate;

/// 初始化
+ (instancetype)sharedManager;
/// 调用接口进行支付
- (void)startPayWithAppId:(NSString *)appId shortCode:(NSString *)shortCode receiveCode:(NSString *)receiveCode returnAppScheme:(NSString *)returnAppScheme;
/// 处理url带来的数据
- (void)handleOpenURL:(NSURL *)url;

@end

NS_ASSUME_NONNULL_END
