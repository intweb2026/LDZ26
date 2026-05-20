from django.urls import path
from . import views

urlpatterns = [
    path('upload',views.upload_media),
    path('homepagedata',views.homePageDataFun),
    path('homepagecompanieslogo',views.homePageCompaniesListFun),
    path('navmaincategories',views.navMainCategoriesFun),
    path('navsubcategories',views.navSubCategoriesFun),

    path('eventspeakers',views.speakersListFun),
    path('eventtestimonials',views.testimonialListFun),
    path('eventsponsors',views.sponsorListFun),
    path('eventindustrytrends',views.industryTrendListFun),
    path('relatedevents',views.relatedEventListFun),
    path('registerpagestaticdata',views.registerPageDataFun),
    path('deligatepackageslist',views.delegatePackagesListFun),
    path('deligatepackageinclusionslist',views.delegatePackageInclusionsListFun),
    # path('getagenda',views.agendaListFun),
    path('whoshouldattendpagedata',views.whoShouldAttendPageDataFun),
    path('eventcoreattandees',views.eventCoreAttendeesFun),
    path('eventparticipatedindustries',views.eventParticipatedIndustriesFun),
    path('getspeakerpagedata',views.speakerPageStaticDataFun),
    path('getspeakerpagepoints',views.speakerPageSecThreePointsFun),
    path('getsponsorpagedata',views.sponsorPageStaticDataFun),
    path('getsponsorpagebulletpoints',views.sponsorPageBulletPointsFun),
    path('getvenuedata',views.venuePageStaticDataFun),
    path('venuegalleryimages',views.venuePageGalleryImagesFun),
    path('newscategories',views.newsCategoriesFun),
    path('generalnews',views.generalNewsFun),
    path('latestnews',views.latestNewsFun),
    path('topnewslist',views.alltopNewsListFun),
    path('subscriberslist',views.subscribersFun),
    path('eventfaqs',views.eventFaqsFun),
    path('contactsofcontactus',views.contatusContactsFun),
    path('deletecontactuscontact',views.delete_contactUs_contact),
    path('contactusstaticdata',views.contatusDataFun),
    path('contactushelpers',views.contatusHelpersDataFun),
    path('pressmediapagestaticdata',views.pressMediaDataFun),
    path('pressmediapageboxes',views.pressMediaBoxDataFun),
    path('registeredcompanies',views.registeredCompaniesFun),
    path('registereddelegates',views.registeredDelegatesFun),
    path('delegatepackageaddons',views.delegateAddOnsFun),
    path('paymentoptionimages',views.paymentOptionImagesFun),
    path('offercoupons',views.offerCouponsFun),
    path('listdelegatetransections',views.delegateTransectionsFun),
    path('eventgeneralsettings',views.eventGeneralSettingsFun),
    path('offercouponusagehistory',views.offerCouponistoryFun),
    path('addonspurchasehistory',views.addOnPurchaseHistoryFun),
    # path('sponsorbenefits',views.sponsorBenifitsFun),
    path('sponsorpackages',views.sponsorPackageTypesFun),
    # path('sponsorpackageinclusions',views.sponsorPackageInclusionsFun),
    path('sponsorpackageaddontypes',views.sponsorPackageAddonTypesFun),
    path('sponsoraddons',views.sponsorPackageAddonsFun),
    # path('sponsoredcompanies',views.sponsoredCompaniesFun),
    path('sponsoreddelegates',views.sponsoredDelegatesFun),
    path('sponsoraddonshistory',views.sponsoredCompanyAddOnsFun),
    path('sponsoredcompanytransections',views.sponsoredCompanyTransectionsFun),
    path('getgrouppassrequest',views.groupPassRegistrationRequestDataFun),
    path('taglinedata',views.taglineDataFun),


    #--------------- Api For Add Home Page Realted Data -----------------#
    path('addthemecolors',views.add_theme_colors),
    path('addeventgeneralsettings',views.add_eventGeneralSetting),
    path('addthemecolors',views.add_nav_logos),
    path('addnavmaincategory',views.add_nav_mainCategory),
    path('editnavmaincategory',views.edit_nav_mainCategory),
    path('deletenavmaincategory',views.delete_nav_mainCategory),

    path('addnavsubcategory',views.add_nav_subCategory),
    path('editnavsubcategory',views.edit_nav_subCategory),
    path('deletenavsubcategory',views.delete_nav_subCategory),

    path('addvideosectionstaticdata',views.add_videoSection_staticInput),
    path('addvideosectionuseroptions',views.add_videoSection_userOptions),
    path('addeventdetails',views.add_event),
    path('addhomespeakersectiondata',views.add_home_speakerSectionData),
    path('addhomethirdsectiondata',views.add_home_thirdSectionData),
    path('addhomekeypointsectiondata',views.add_home_keyPointSectionData),
    path('eventkeypoints',views.keyPointsListFun),
    path('addkeypoint',views.add_keyPoint),
    path('editkeypoint',views.edit_keyPoint),
    path('deletekeypoint',views.delete_keyPoint),
    path('addhomecountsecbackimage',views.add_home_countSectionImage),

    path('eventstatatics',views.eventStataticsFun),
    path('addhomecountpoints',views.add_home_countSectionTopics),
    path('edithomecountpoints',views.edit_home_countSectionTopics),
    path('deletehomecountpoints',views.delete_home_countSectionTopics),


    path('addhometestimonialstaticdata',views.add_home_testimonialSectionStaticData),
    path('addhomepastattandeesstaticdata',views.add_home_pastAttandeesSectionStaticData),

    path('pastAttandeelist',views.pastAttandeeListFun),
    path('addpastattandee',views.add_pastAttandee),
    path('editpastattandee',views.edit_pastAttandee),
    path('deletepastattandee',views.delete_pastAttandee),

    path('expertspeakers',views.eventExpertSpeakersFun),
    path('addexpertspeaker',views.add_expertSpeaker),
    path('editexpertspeaker',views.edit_expertSpeaker),
    path('deleteexpertspeaker',views.delete_expertSpeaker),
    
    path('addhomesponsorlable',views.add_sponsorLable),
    path('addfooterfirstsectionoptions',views.add_footerFirstSecOptions),

    path('footersocialmediaoptions',views.footerSocialMediaOptionsFun),
    path('addfootersocialmediaoptions',views.add_footerSocialMediaOptions),
    path('editfootersocialmediaoptions',views.edit_footerSocialMediaOptions),
    path('deletefootersocialmediaoptions',views.delete_footerSocialMediaOptions),
    
    path('addhomepagecompanies',views.add_homePageCompanies),
    path('edithomepagecompanies',views.edit_homePageCompanies),
    path('deletehomepagecompanies',views.delete_homePageCompanies),


    path('addeventspeakers',views.add_speaker),
    path('editeventspeakers',views.edit_speaker),
    path('deleteeventspeakers',views.delete_speaker),

    path('addtestimonial',views.add_testimonial),
    path('edittestimonial',views.edit_testimonial),
    path('deletetestimonial',views.delete_testimonial),

    path('addsponsor',views.add_sponsor),
    path('editsponsor',views.edit_sponsor),
    path('deletesponsor',views.delete_sponsor),

    path('addindustrytrends',views.add_industryTrend),
    path('editindustrytrends',views.edit_industryTrend),
    path('deleteindustrytrends',views.delete_industryTrend),

    path('addrelatedevent',views.add_relatedEvent),
    path('editrelatedevent',views.edit_relatedEvent),
    path('deleterelatedevent',views.delete_relatedEvent),


    #------------------------------------------------------#

    #--------------- Api For Add Register & Book Now Page Realted Data -----------------#
    path('addregisterpagestaticdata',views.add_regPageStaticData),
    path('adddelegatepackage',views.add_delegatePackage),
    path('editdelegatepackage',views.edit_delegatePackage),
    path('deletedelegatepackage',views.delete_delegatePackage),

    path('addgrouppassrequest',views.add_groupPassRequest),
    path('adddelegatepackageinclusion',views.add_delegatePackageInclusion),

    path('adddelegatepackageaddons',views.add_delegatePackageAddOns),
    path('editdelegatepackageaddons',views.edit_delegatePackageAddOns),
    path('deletedelegatepackageaddons',views.delete_delegatePackageAddOns),

    path('addpaymentoptionimage',views.add_paymentOptionImg),

    path('addoffercoupon',views.add_offerCoupon),
    path('editoffercoupon',views.edit_offerCoupon),
    path('deleteoffercoupon',views.delete_offerCoupon),

    #------------------------------------------------------#

    #--------------- Api For Add Program Page Realted Data -----------------#
    # path('editagenda',views.edit_agenda),
    # path('addagenda',views.add_agenda),
    # path('deleteagenda',views.delete_agenda),

    #------------------------------------------------------#

    #--------------- Api For Add Who Should Attend Page Realted Data -----------------#
    path('addwhoshouldattendpagestaticdata',views.add_whoAttendPageStaticData),

    path('addeventcoreattandee',views.add_eventCoreAttandee),
    path('editeventcoreattandee',views.edit_eventCoreAttandee),
    path('deleteeventcoreattandee',views.delete_eventCoreAttandee),


    path('addeventparticipatedindustry',views.add_eventParticipatedIndustry),
    path('editeventparticipatedindustry',views.edit_eventParticipatedIndustry),
    path('deleteeventparticipatedindustry',views.delete_eventParticipatedIndustry),

    #------------------------------------------------------#

    #--------------- Api For Add Speaker Page Realted Data -----------------#
    path('addspeakerpagestaticdata',views.add_speakerPageStaticData),
    path('addspeakerpagesecthreepoints',views.add_speakerPageSecThirdPoints),
    #------------------------------------------------------#

    #--------------- Api For Add Sponsor Page Realted Data -----------------#
    path('addsponsorpagestaticdata',views.add_sponsorPageStaticData),
    path('editsponsorpagestaticdata',views.edit_sponsorPageStaticData),
    path('deletesponsorpagestaticdata',views.delete_sponsorPageStaticData),

    path('addsponsorpagebulletpoints',views.add_sponsorPageBulletPoints),
    # path('addsponsorpackagebenifit',views.add_sponsorPackageBenifit),
    path('addsponsorpackage',views.add_sponsorPackageType),
    path('editsponsorpackage',views.edit_sponsorPackageType),
    path('deletesponsorpackage',views.delete_sponsorPackageType),

    # path('addsponsorpackageinclusion',views.add_sponsorPackageInclusion),
    path('addsponsoraddontype',views.add_sponsorAddonType),
    path('editsponsoraddontype',views.edit_sponsorAddonType),
    path('deletesponsoraddontype',views.delete_sponsorAddonType),

    path('addsponsoraddons',views.add_sponsorPackageAddOns),
    path('editsponsoraddons',views.edit_sponsorPackageAddOns),
    path('deletesponsoraddons',views.delete_sponsorPackageAddOns),

    #------------------------------------------------------#

    #--------------- Api For Add Venue Page Realted Data -----------------#
    path('addvenuepagestaticdata',views.add_venuePageStaticData),
    path('addvenuegalleryimages',views.add_venuePageGalleryImages),
    #------------------------------------------------------#

    #--------------- Api For Add Resource Page Realted Data -----------------#
    path('addnewscategory',views.add_newsCategory),
    path('editnewscategory',views.edit_newsCategory),
    path('deletenewscategory',views.delete_newsCategory),


    path('addgeneralnews',views.add_generalNews),
    path('editgeneralnews',views.edit_generalNews),
    path('deletegeneralnews',views.delete_generalNews),


    path('addlatestnews',views.add_latestNews),
    path('addtopnews',views.add_topNews),
    path('addsubscriber',views.add_subscriber),
    path('deletesubscriber',views.delete_subscriber),

    #------------------------------------------------------#

    #--------------- Api For Add Faq Page Realted Data -----------------#
    path('addfaq',views.add_faq),
    path('editfaq',views.edit_faq),
    path('deletefaq',views.delete_faq),

    #------------------------------------------------------#

    #--------------- Api For Add Contact Us Page Realted Data -----------------#
    path('addcontactusrequest',views.add_contactUsRequest),
    path('addcontactuspagestaticdata',views.add_contactUsPageStaticData),
    path('addcontactuspagehelper',views.add_contactUsPageHelper),
    path('editcontactuspagehelper',views.edit_contactUsPageHelper),
    path('deletecontactuspagehelper',views.delete_contactUsPageHelper),


    #------------------------------------------------------#

    #--------------- Api For Add Press Media Page Realted Data -----------------#
    path('addpressmediapagestaticdata',views.add_pressMediaPageStaticData),
    path('addpressmediapageboxdata',views.add_pressediaPageBoxData),
    #------------------------------------------------------#
    
    #--------------- Api related to Purchase Package -----------------#
    path('addnewdelegate',views.add_delegate),
    path('addnewsponsor',views.add_newSponsor),

    path('mediapagehelpers',views.mediaPageHelpersFun),
    path('addmediapagehelpers',views.add_mediaPageHelpers),
    path('editmediapagehelpers',views.edit_mediaPageHelpers),
    path('deletemediapagehelpers',views.delete_mediaPageHelpers),

    path('addcrowdformrequest',views.add_standOutCrowdRequest),
    path('standoutcrowdresponses',views.standOutCrowdRequestListFun),
    path('deletecrowdformrequest',views.delete_standOutCrowdRequest),

    path('addbecomespeakerrequest',views.add_becomeSpeakerRequest),
    path('becomespeakerresponses',views.becomeSpeakerFormRequestListFun),
    path('deletebecomespeakerrequest',views.delete_becomeSpeakerRequest),

    path('addquickproposalrequest',views.add_quickProposalRequest),
    path('quickproposalresponses',views.quickProposalFormRequestListFun),
    path('deletequickproposalrequest',views.delete_quickProposalRequest),

    path('adduserpassrequest',views.add_endUserPassRegistrationRequest),
    path('usrpassresponses',views.endUserPassRegistrationListFun),
    path('deleteuserpassrequest',views.delete_endUserPassRegRequest),

    path('addhomepastattandee',views.add_homePastAttandee),
    path('homepastattandees',views.homePastAttandeeListFun),
    path('deletehomepastattandee',views.delete_homePastAttandee),
    path('edithomepastattandee',views.edit_homePastAttandee),

    path('eventleaderlist',views.eventLeaderListFun),
    path('addeventleader',views.add_eventLeader),
    path('editeventleader',views.edit_eventLeader),
    path('deleteeventleader',views.delete_eventLeader),

    path('speakerbyid',views.getSpeakerDataById),
    path('newsbyid',views.getNewsDataById),
    path('getnavitems',views.navItemsFun),

    path('addeventdata',views.add_event_general_data),
    path('trendbyid',views.getIndustryTrendDataById),

    path('offercouponbycode',views.offerCouponByCodeFun),

    path('stripe-client-secret',views.create_payment_intent),
    path('verify-payment',views.verify_payment),

    path('joinedcompanies',views.joinedCompaniesFun),
    path('joineddelegates',views.joinedDelegatesFun),
    path('companytransections',views.companyTransectionsFun),

    path('getactivedelegatepackage',views.getActiveDelegatePackageFun),

    path('joinedsponsorcompanies',views.sponsoredCompaniesFun),
    path('joinedsponsordelegates',views.joinedSponsorDelegatesFun),
    path('sponsorcompanytransections',views.sponsorCompanyTransectionsFun),

    path('sponsorbyid',views.getSponsorDataById),
    path('gettheme',views.getThemeFun),
    path('gettheme',views.getThemeFun),
    path('sendmail',views.send_booking_email),
    path('sendtozoho',views.send_to_zoho),
    path('sendtocrm',views.send_to_crm),

    path('getagenda', views.agendaListFun),
    path('addagenda', views.add_agenda),
    path('editagenda', views.edit_agenda),
    path('deleteagenda', views.delete_agenda),
    path('reorder-agenda', views.reorder_agenda),

    path('userlist', views.userListFun),
    path('adduser', views.addUserFun),
    path('updateuserpermissions', views.updateUserPermissionsFun),
    path('deleteuser', views.deleteUserFun),
    path('permissionlist', views.permissionListFun),
    path('rolelist', views.roleListFun),
    path('addrole', views.addRoleFun),
    path('deleterole', views.deleteRoleFun),
    path('rolepermissions', views.getRolePermissionsFun),
    path('updaterolepermissions', views.updateRolePermissionsFun),
    path('customlogin', views.customLoginFun),
    path('getnavbardata', views.getNavbarDataFun),

    path('getslideShare', views.slideShareListFun),
    path('addslideShare', views.add_slideShare),
    path('editslideShare', views.edit_slideShare),
    path('deleteslideShare', views.delete_slideShare),

    path('getslideShareAttandee', views.slideShareAttandeeListFun),
    path('addslideShareAttandee', views.add_slideShare_attandee),
    path('editslideShareAttandee', views.edit_slideShare_attandee),
    path('deleteslideShareAttandee', views.delete_slideShare_attandee),

    path('getslideShareAccess', views.slideShareAccessListFun),
    path('addslideShareAccess', views.add_slideShare_access),
    path('editslideShareAccess', views.edit_slideShare_access),
    path('deleteslideShareAccess', views.delete_slideShare_access),
    path('securelogin', views.secure_login_slideShare),

    path('generate-invoice-no', views.generate_invoice_number),
    path('payonlinetransections', views.payOnlineTransectionListFun),
    path('addpayonlinerequest', views.add_payOnline_request),

    path('verifyemaildomain', views.verify_email_domain),

    path('getblockdomain', views.blockDomainListFun),
    path('addblockdomain', views.add_blockDomain),
    path('editblockdomain', views.edit_blockDomain),
    path('deleteblockdomain', views.delete_blockDomain),

    path('savenavcheckstatus', views.save_nav_checked_status),

    path('footeroptions', views.footerOptionsFun),
    path('addfooteroption', views.add_footerOption),
    path('editfooteroption', views.edit_footerOption),
    path('deletefooteroption', views.delete_footerOption),
    path('savefootercheckstatus', views.save_footer_checked_status),

    path('toemails', views.get_to_emails),
    path('savetoemails', views.save_to_emails),

    path('addagendasubscriber', views.add_agendaSubscriber),
    path('agendasubscribers', views.agendaSubscriberListFun),

    path('addcalendersubscriber', views.add_calenderSubscriber),
    path('calendersubscribers', views.calenderSubscriberListFun),

    path('sponsoroffercoupons',views.sponsorOfferCouponsFun),
    path('addsponsoroffercoupon',views.add_sponsorOfferCoupon),
    path('editsponsoroffercoupon',views.edit_sponsorOfferCoupon),
    path('deletesponsoroffercoupon',views.delete_sponsorOfferCoupon),
    path('sponsoroffercouponbycode',views.sponsorOfferCouponByCodeFun),

    path('eventprojects', views.eventProjectListFun),
    path('addeventproject', views.add_eventProject),
    path('editeventproject', views.edit_eventProject),
    path('deleteeventproject', views.delete_eventProject),

    path('pageseo', views.pageSeoListFun),
    path('addpageseo', views.add_pageSeo),
    path('editpageseo', views.edit_pageSeo),
    path('deletepageseo', views.delete_pageSeo),

    path('sponsorcards', views.sponsorCardsListFun),
    path('addsponsorcard', views.add_sponsorCard),
    path('editsponsorcard', views.edit_sponsorCard),
    path('deletesponsorcard', views.delete_sponsorCard),

]