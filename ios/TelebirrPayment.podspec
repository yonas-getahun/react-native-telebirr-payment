Pod::Spec.new do |s|
    s.name             = 'TelebirrPayment'
    s.version          = '1.0.0'
    s.summary          = 'A React Native module for Telebirr payments using EthiopiaPaySDK.'
    s.description      = 'This module allows React Native apps to process payments using Telebirr via the EthiopiaPaySDK.'
    s.author           = { 'Yonas Getahun' => 'your.email@example.com' }
    s.license          = { :type => 'MIT', :file => '../LICENSE' }
    s.homepage         = 'https://github.com/yourusername/TelebirrPayment'
    s.source           = { :git => 'https://github.com/yourusername/TelebirrPayment.git', :tag => s.version.to_s }
    s.platform         = :ios, '11.0'
  
    # Source files for the module
    s.source_files     = 'ios/*.{h,m,mm}'
  
    # Specify the React Native dependency
    s.dependency       'React'
  
    # Include the EthiopiaPaySDK framework
    s.vendored_frameworks = 'ios/EthiopiaPaySDK.framework'
  
    # Include any system frameworks that are necessary for your code
    s.frameworks       = 'UIKit', 'Foundation'
  
    # Add headers that need to be linked (this helps to make sure the framework header files are available)
    s.public_header_files = 'ios/*.h'
  
    # Add the path to the framework headers if it's in a custom location (EthiopiaPaySDK.framework)
    s.header_mappings_dir = 'ios/EthiopiaPaySDK.framework/Headers'
  end
  