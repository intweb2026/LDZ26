from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.contrib.auth.models import User, Permission, Group
from django.db import transaction
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.permissions import AllowAny
import re
import json
import random
from datetime import datetime, timedelta
from django.core.mail import EmailMultiAlternatives
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.db.models import F
from Myadmin.serializers import eventAgendaSerializer, eventIndustryTrendsSerializer
from rest_framework.throttling import AnonRateThrottle
# Create your views here.
from .models import homePageNavLogoData,homePageNavMainCategories,homePageNavSubCategories,themeColorSettings,homePageVideoSectionInput,videoSectionUserOptions,speakerSection,homePageThirdSection,keyPointsSection,keyPointsSectionPoints,countSection,countSectionTopic,testimonialSection,pastAttandeesSection,sponsorSection, footerFirstSectionOptions, footerSocialMediaOptions,companiesLogoSection,registerPageSettings,whoShouldAttendPageData,speakerPageData,speakerPageSectionThreePoints,sponsorPageData,sponsorPageBulletData,venuePageData,venuePageGallery,newsCategory,generalNewsPoint,latestNews,topNews,subscribers,contactUsData,contactUsPageData,contactUsHelpData,pressMediaPageData,pressMediaPageBoxData,mediaPageHelpers,standOutCrowdRequestData,becomeSpeakerRequestData,quickProposalRequestData,endUserPassRegistrationRequestData,pastAttandeeHomeData,footerOptions,toEmails,agendaSubscriber,calenderSubscriber,SidebarModule, SidebarSubModule, AdminUser, AdminRole, sponsorCards, InvoiceNumberTracker
from Event.models import eventDetails,eventPastAttandees,eventExpertSpeakers,eventSpeakers,eventTestimonials,eventSponsors,eventIndustryTrends,relatedEvents,eventDeligatePackages,deligatePackageInclusionPoints,eventAgenda,eventCoreAttandees,eventParticipatedIndustries,eventFaqs,groupPassRegistrationRequestData,registeredCompanyDetails,registeredDelegates,delegatesAddOns,paymentOptionImage,offerCoupon,delegateTransectionData,eventGeneralSettings,offerCouponHistory,addOnsHistory,sponsorPackageTypes,sponsorPackageAddOnTypes,sponsorPackageAddOns,sponseredCompanyDetails,registeredSponseredDelegates,sponsoredCompanyAddOnsDetails,sponsorCompanyTransectionData,sponsorOfferCouponHistory,eventLeaders,eventSlideShares,eventSlideSharesAttandees,slideSharesAccessPersons,payOnlineTransectionData,blockedEmailDomains,sponsorOfferCoupon,eventProject,pageSeoSettings
import requests
import jwt
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password
#---------------------------- Api For Upload Media ----------------------------#
@api_view(['POST'])
def upload_media(request):
    response = request.data
    myfile = response['media']
    if myfile != 'null':
        fs = FileSystemStorage()
        location = "media"
        filename = fs.save(location + myfile.name, myfile)
        uploaded_file_url = fs.url(filename)   # e.g. /media/filename.jpg — domain-free
    return JsonResponse({'status': True, "message": "Record Updated Successfully", "uploadedURL": uploaded_file_url})

#---------------------------- Api For Home Page Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def homePageDataFun(request):
    theme_list = themeColorSettings.objects.all().filter(isDelete='No').order_by('-id')
    themeSettingsData = []
    for theme in theme_list:
        x={
            'id':theme.id,
            'primaryColor':theme.primaryColor,
            'secondaryColor':theme.secondaryColor,
            'lightColor':theme.lightColor,
            'darkColor':theme.darkColor,
            'gradientColor':theme.gradientColor,
            'headerContent':theme.headerContent,
            'editorStyle':theme.editorStyle,
            'headerType':theme.headerType,
            'created_at': theme.created_at,
            'updated_at': theme.updated_at,
            'created_by': theme.created_by,
            'updated_by': theme.updated_by,
        }
        themeSettingsData.append(x)
    logo_list = homePageNavLogoData.objects.all().filter(isDelete='No').order_by('-id')
    dataLogo = []
    for logo in logo_list:
        x={
            'id':logo.id,
            'whiteLogo':logo.whiteLogoLink,
            'blackLogo':logo.blackLogoLink,
            'created_at': logo.created_at,
            'updated_at': logo.updated_at,
            'created_by': logo.created_by,
            'updated_by': logo.updated_by,
        }
        dataLogo.append(x)


    videoSectionData_list = homePageVideoSectionInput.objects.all().filter(isDelete='No').order_by('-id')
    dataVideo = []
    for video in videoSectionData_list:
        x={
            'id':video.id,
            'videoLinkmp4':video.videoLinkmp4,
            'videoLinkwebm':video.videoLinkwebm,
            'eventDetailBackImage':video.eventDetailBackImage,
            'eventStataticsBackImage':video.eventStataticsBackImage,
            'eventExpertSpeakerBackImage':video.eventExpertSpeakerBackImage,
            'videoReplaceImage':video.videoReplaceImage,
            'created_at': video.created_at,
            'updated_at': video.updated_at,
            'created_by': video.created_by,
            'updated_by': video.updated_by,
        }
        dataVideo.append(x)

    eventDetails_list = eventDetails.objects.all().filter(isDelete='No').order_by('-id')
    eventDetialsOptions = []
    for eventDetail in eventDetails_list:
        x={
            'id':eventDetail.id,
            'eventName':eventDetail.eventName,
            'eventShortCode':eventDetail.eventShortCode,
            'eventDate':eventDetail.eventDate,
            'eventLocation':eventDetail.eventLocation,
            'eventYear':eventDetail.eventYear,
            'eventShortDate':eventDetail.eventShortDate,
            'eventShortLocation':eventDetail.eventShortLocation,
            'eventColorName':eventDetail.eventColorName,
            'eventCityShortCode':eventDetail.eventCityShortCode,
            'eventPostponed':eventDetail.eventPostponed,
            'industryName':eventDetail.industryName,
            'previousAgenda':eventDetail.previousAgenda,
            'hubspotDisposition':eventDetail.hubspotDisposition,
            'hubspotEmailStatus':eventDetail.hubspotEmailStatus,
            'eventType':eventDetail.eventType,
            'isSeoEnable':eventDetail.isSeoEnable,
            'agendaVersion':eventDetail.agendaVersion,
            'stripeMode':eventDetail.stripeMode,
            'recaptchaKey':eventDetail.recaptchaKey,
            'hubspotId':eventDetail.hubspotId,
            'contactHubspotId':eventDetail.contactHubspotId,
            'googleTranslate':eventDetail.googleTranslate,
            'favicon':eventDetail.favicon,
            'created_at': eventDetail.created_at,
            'updated_at': eventDetail.updated_at,
            'created_by': eventDetail.created_by,
            'updated_by': eventDetail.updated_by,
        }
        eventDetialsOptions.append(x)

    eventGeneralSetting_list = eventGeneralSettings.objects.all().filter(isDelete='No').order_by('-id')
    eventGeneralSettingsOptions = []
    for genSet in eventGeneralSetting_list:
        x={
            'id':genSet.id,
            'purchaseTaxPercent':genSet.purchaseTaxPercent,
            'currencyName':genSet.currencyName,
            'currencySymbol':genSet.currencySymbol,
            'currencyPosition':genSet.currencyPosition,
        }
        eventGeneralSettingsOptions.append(x)

    seo_list = pageSeoSettings.objects.filter(isDelete='No').order_by('pageName')
    pageSeoData = []
    for seo in seo_list:
        pageSeoData.append({
            'id': seo.id,
            'pageName': seo.pageName,
            'pageMetaTitle': seo.pageMetaTitle,
            'pageMetaDescription': seo.pageMetaDescription,
            'pageOgImage': seo.pageOgImage,
        })

    y = {
        'themeSetting': themeSettingsData,
        'navLogos': dataLogo,
        'homeVideoSctionSettings': dataVideo,
        'homeVideoSctionEventDetails': eventDetialsOptions,
        'eventGeneralSettings': eventGeneralSettingsOptions,
        'pageSeoSettings': pageSeoData,
    }
    return JsonResponse({'homePageSettings': y, 'status': True})

#---------------------------- Api For Home Page Companies Logo Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def homePageCompaniesListFun(request):
    logo_list = companiesLogoSection.objects.all().filter(isDelete='No')
    logoData = []
    for logo in logo_list:
        x={
            'id':logo.id,
            'logoLink':logo.logoLink,
            'logoShowOrder':logo.logoShowOrder,
            'created_at': logo.created_at,
            'updated_at': logo.updated_at,
            'created_by': logo.created_by,
            'updated_by': logo.updated_by,
        }
        logoData.append(x)
    return JsonResponse({'homePageCompaniesList': logoData, 'status': True})

#---------------------------- Api For Home Page Navbar Main Categories ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def navMainCategoriesFun(request):
    mainCategory_list = homePageNavMainCategories.objects.all().filter(isDelete='No').order_by('id')
    dataMainCategory = []
    for mainCat in mainCategory_list:
        x={
            'id':mainCat.id,
            'navMainCategoryName':mainCat.navMainCategoryName,
            'navMainCategoryPath':mainCat.navMainCategoryPath,
            'isChecked':mainCat.isChecked,
            'created_at': mainCat.created_at,
            'updated_at': mainCat.updated_at,
            'created_by': mainCat.created_by,
            'updated_by': mainCat.updated_by,
        }
        dataMainCategory.append(x)
    return JsonResponse({'navMainategories': dataMainCategory, 'status': True})

#---------------------------- Api For Home Page Navbar Sub Categories ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def navSubCategoriesFun(request):
    subCategory_list = homePageNavSubCategories.objects.all().filter(isDelete='No').order_by('id')
    dataSubCategory = []
    for subCat in subCategory_list:
        mainCatDetais = {}
        if subCat.navMainCategoryId != None:
            mainCatDetais = {
                'id':subCat.navMainCategoryId.id,
                'navMainCategoryName':subCat.navMainCategoryId.navMainCategoryName,
                'navMainCategoryPath':subCat.navMainCategoryId.navMainCategoryPath,
                'isChecked': subCat.navMainCategoryId.isChecked,
            }
        x={
            'id':subCat.id,
            'relatedMainCategory': mainCatDetais,
            'navSubCategoryName':subCat.navSubCategoryName,
            'navSubCategoryPath':subCat.navSubCategoryPath,
            'isChecked': subCat.isChecked,
            'created_at': subCat.created_at,
            'updated_at': subCat.updated_at,
            'created_by': subCat.created_by,
            'updated_by': subCat.updated_by,
        }
        dataSubCategory.append(x)
    return JsonResponse({'navSubCategories': dataSubCategory, 'status': True})

#---------------------------- Api For Speaker List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def speakersListFun(request):
    speaker_list = eventSpeakers.objects.all().filter(isDelete='No').order_by('-eventSpeakerLinkedinFollowers')
    speakerData = []
    for speaker in speaker_list:
        x={
            'id':speaker.id,
            'eventSpeakerName':speaker.eventSpeakerName,
            'eventSpeakerCompany':speaker.eventSpeakerCompany,
            'eventSpeakerShortDescription':speaker.eventSpeakerShortDescription,
            'eventSpeakerDescription':speaker.eventSpeakerDescription,
            'viewSpeakerButtonLabel':speaker.viewSpeakerButtonLabel,
            'speakerProfilePageLink':speaker.speakerProfilePageLink,
            'eventSpeakerHomePageImage':speaker.eventSpeakerHomePageImage,
            'eventSpeakerProfilePageImage':speaker.eventSpeakerProfilePageImage,
            'eventSpeakerFeaturedPageImage':speaker.eventSpeakerFeaturedPageImage,
            'eventSpeakerEmail':speaker.eventSpeakerEmail,
            'eventSpeakerProposedTitle':speaker.eventSpeakerProposedTitle,
            'isParticipated':speaker.isParticipated,
            'eventSpeakerProfilePageDescription':speaker.eventSpeakerProfilePageDescription,
            'eventSpeakerMetaTitle':speaker.eventSpeakerMetaTitle,
            'eventSpeakerMetaDescription':speaker.eventSpeakerMetaDescription,
            'eventSpeakerLinkedinFollowers':speaker.eventSpeakerLinkedinFollowers,
            'created_at': speaker.created_at,
            'updated_at': speaker.updated_at,
            'created_by': speaker.created_by,
            'updated_by': speaker.updated_by,
        }
        speakerData.append(x)
    return JsonResponse({'eventSpeakersList': speakerData, 'status': True})

#---------------------------- Api For Testimonial List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def testimonialListFun(request):
    testimonial_list = eventTestimonials.objects.all().filter(isDelete='No').order_by('-id')
    testimonialData = []
    for testimonial in testimonial_list:
        x={
            'id':testimonial.id,
            'personName':testimonial.personName,
            'personCompany':testimonial.personCompany,
            'personMessage':testimonial.personMessage,
            'created_at': testimonial.created_at,
            'updated_at': testimonial.updated_at,
            'created_by': testimonial.created_by,
            'updated_by': testimonial.updated_by,
        }
        testimonialData.append(x)
    return JsonResponse({'eventTestimonials': testimonialData, 'status': True})

#---------------------------- Api For Sponsor List ----------------------------#
# @permission_classes((AllowAny,))
# @api_view(['GET'])
# def sponsorListFun(request):
#     sponsor_list = eventSponsors.objects.all().filter(isDelete='No').order_by('-id')
#     sponsorData = []
#     for sponsor in sponsor_list:
#         x={
#             'id':sponsor.id,
#             'sponsorComapnyName':sponsor.sponsorComapnyName,
#             'sponsorComapnyLogo':sponsor.sponsorComapnyLogo,
#             'sponsorType':sponsor.sponsorType,
#             'sponsorComapnyBioDescription':sponsor.sponsorComapnyBioDescription,
#             'sponsorWebsite':sponsor.sponsorWebsite,
#             'sponsorComapnyBioLogo':sponsor.sponsorComapnyBioLogo,
#             'sponsorEmail':sponsor.sponsorEmail,
#             'sponsorMobile':sponsor.sponsorMobile,
#             'relateComapnyPersonName':sponsor.relateComapnyPersonName,
#             'eventSponsorMetaTitle':sponsor.eventSponsorMetaTitle,  
#             'eventSponsorMetaDescription':sponsor.eventSponsorMetaDescription,
#             'created_at': sponsor.created_at,
#             'updated_at': sponsor.updated_at,
#             'created_by': sponsor.created_by,
#             'updated_by': sponsor.updated_by,
#         }
#         sponsorData.append(x)
#     return JsonResponse({'eventSponsors': sponsorData, 'status': True})

@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorListFun(request):
    SPONSOR_TYPE_ORDER = {
        'Lead': 1,
        'Platinum': 2,
        'Gold': 3,
        'Silver': 4,
        'Associated': 5,
        'Dummy': 6,
    }

    sponsor_list = eventSponsors.objects.all().filter(isDelete='No')
    
    # Sort in Python using the priority map
    sponsor_list = sorted(sponsor_list, key=lambda s: SPONSOR_TYPE_ORDER.get(s.sponsorType, 99))

    sponsorData = []
    for sponsor in sponsor_list:
        x = {
            'id': sponsor.id,
            'sponsorComapnyName': sponsor.sponsorComapnyName,
            'sponsorComapnyLogo': sponsor.sponsorComapnyLogo,
            'sponsorType': sponsor.sponsorType,
            'sponsorComapnyBioDescription': sponsor.sponsorComapnyBioDescription,
            'sponsorWebsite': sponsor.sponsorWebsite,
            'sponsorComapnyBioLogo': sponsor.sponsorComapnyBioLogo,
            'sponsorEmail': sponsor.sponsorEmail,
            'sponsorMobile': sponsor.sponsorMobile,
            'relateComapnyPersonName': sponsor.relateComapnyPersonName,
            'eventSponsorMetaTitle': sponsor.eventSponsorMetaTitle,
            'eventSponsorMetaDescription': sponsor.eventSponsorMetaDescription,
            'created_at': sponsor.created_at,
            'updated_at': sponsor.updated_at,
            'created_by': sponsor.created_by,
            'updated_by': sponsor.updated_by,
        }
        sponsorData.append(x)
    
    return JsonResponse({'eventSponsors': sponsorData, 'status': True})

#---------------------------- Api For Industry Trend List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def industryTrendListFun(request):
    industryTrend_list = eventIndustryTrends.objects.all().filter(isDelete='No')
    industryTrendData = []
    for trend in industryTrend_list:
        x={
            'id':trend.id,
            'trendTitle':trend.trendTitle,
            'trendRedirectPath':trend.trendRedirectPath,
            'trendShortDescription':trend.trendShortDescription,
            'trendLongDescription':trend.trendLongDescription,
            'trendMetaTitle':trend.trendMetaTitle,
            'trendMetaDescription':trend.trendMetaDescription,
            'created_at': trend.created_at,
            'updated_at': trend.updated_at,
            'created_by': trend.created_by,
            'updated_by': trend.updated_by,
        }
        industryTrendData.append(x)
    return JsonResponse({'eventIndustryTrends': industryTrendData, 'status': True})


#---------------------------- Api For Get Past Attandee List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def pastAttandeeListFun(request):
    pastAttandees_Data = eventPastAttandees.objects.all().filter(isDelete='No')
    pastAttandeesOptions = []
    for attandee in pastAttandees_Data:
        x={
            'id':attandee.id,
            'pastAttandeeName':attandee.pastAttandeeName,
            'pastAttandeeLogo':attandee.pastAttandeeLogo,
            'created_at': attandee.created_at,
            'updated_at': attandee.updated_at,
            'created_by': attandee.created_by,
            'updated_by': attandee.updated_by,
        }
        pastAttandeesOptions.append(x) 
    return JsonResponse({'pastAttandees': pastAttandeesOptions, 'status': True})

#---------------------------- Api For Related Event List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def relatedEventListFun(request):
    relatedEvent_list = relatedEvents.objects.all().filter(isDelete='No')
    relatedEventsData = []
    for event in relatedEvent_list:
        x={
            'id':event.id,
            'eventName':event.eventName,
            'eventLocation':event.eventLocation,
            'eventWebsiteLink':event.eventWebsiteLink,
            'eventDate':event.eventDate,
            'eventImage':event.eventImage,
            'eventHoverImage':event.eventHoverImage,
            'created_at': event.created_at,
            'updated_at': event.updated_at,
            'created_by': event.created_by,
            'updated_by': event.updated_by,
        }
        relatedEventsData.append(x)
    return JsonResponse({'relatedEvents': relatedEventsData, 'status': True})

#---------------------------- Api For Register Page Static Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def registerPageDataFun(request):
    registerPageData_list = registerPageSettings.objects.all().filter(isDelete='No').order_by('-id')
    registerPageData = []
    for regData in registerPageData_list:
        x={
            'id':regData.id,
            'sectionFirstTitle':regData.sectionFirstTitle,
            'sectionFirstPackageTitle':regData.sectionFirstPackageTitle,
            'sectionFirstPackageDescription':regData.sectionFirstPackageDescription,
            'groupPassSectionTilte':regData.groupPassSectionTilte,
            'groupPassSectionButtonTitle':regData.groupPassSectionButtonTitle,
            'created_at': regData.created_at,
            'updated_at': regData.updated_at,
            'created_by': regData.created_by,
            'updated_by': regData.updated_by,
        }
        registerPageData.append(x)
    return JsonResponse({'registerPageStaticData': registerPageData, 'status': True})


#---------------------------- Api For Get Delegate Package List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def delegatePackagesListFun(request):
    delegatePackage_list = eventDeligatePackages.objects.all().filter(isDelete='No').order_by('-id')
    delegatePackagesListData = []
    for delPackage in delegatePackage_list:
        x={
            'id':delPackage.id,
            'deligatePackageName':delPackage.deligatePackageName,
            'deligatePackagePrice':delPackage.deligatePackagePrice,
            'deligatePackageStatus':delPackage.deligatePackageStatus,
            'deligatePackageShowOrder':delPackage.deligatePackageShowOrder,
            'deligatePackageExpiryDate':delPackage.deligatePackageExpiryDate,
            'created_at': delPackage.created_at,
            'updated_at': delPackage.updated_at,
            'created_by': delPackage.created_by,
            'updated_by': delPackage.updated_by,
        }
        delegatePackagesListData.append(x)
    return JsonResponse({'delegatePackages': delegatePackagesListData, 'status': True})

#---------------------------- Api For Get Delegate Package Inclusion List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def delegatePackageInclusionsListFun(request):
    delegatePackageInclusions_list = deligatePackageInclusionPoints.objects.all().filter(isDelete='No').order_by('-id')
    delegatePackageInclusionsListData = []
    for delIncl in delegatePackageInclusions_list:
        x={
            'id':delIncl.id,
            'inclusionPointIcon':delIncl.inclusionPointIcon,
            'inclusionPointDescription':delIncl.inclusionPointDescription,
            'created_at': delIncl.created_at,
            'updated_at': delIncl.updated_at,
            'created_by': delIncl.created_by,
            'updated_by': delIncl.updated_by,
        }
        delegatePackageInclusionsListData.append(x)
    return JsonResponse({'delegatePackageInclusions': delegatePackageInclusionsListData, 'status': True})

#---------------------------- Api For Get Agenda List ----------------------------#
# @permission_classes((AllowAny,))
# @api_view(['GET'])
# def agendaListFun(request):
#     agenda_list = eventAgenda.objects.all().filter(isDelete='No').order_by('sortOrder')
#     agendaListData = []
#     for agenda in agenda_list:
#         x={
#             'id':agenda.id,
#             'status':agenda.status,
#             'heading':agenda.heading,
#             'day':agenda.day,
#             'startTime':agenda.startTime,
#             'endTime':agenda.endTime,
#             'sponsorBy':agenda.sponsorBy,
#             'sortOrder':agenda.sortOrder,
#             'speakerFormat':agenda.speakerFormat,
#             'bulletPoints':agenda.bulletPoints,
#             'industryTrends':agenda.industryTrends,
#             'speaker1Bullets':agenda.speaker1Bullets,
#             'speaker2Bullets':agenda.speaker2Bullets,
#             'panelSpeakerImages':agenda.panelSpeakerImages,
#             'panelSpeakerIds':agenda.panelSpeakerIds,
#             'panelModerators':agenda.panelModerators,
#             'selectedSpeakers':agenda.selectedSpeakers,
#             'singleSpeakerAgendaImg':agenda.singleSpeakerAgendaImg,
#             'singleSpeakerCompanyImg':agenda.singleSpeakerCompanyImg,
#             'singleSpeakerId':agenda.singleSpeakerId,
#             'Speaker1AgendaImg':agenda.Speaker1AgendaImg,
#             'Speaker1CompanyImg':agenda.Speaker1CompanyImg,
#             'Speaker1Id':agenda.Speaker1Id,
#             'Speaker2AgendaImg':agenda.Speaker2AgendaImg,
#             'Speaker2CompanyImg':agenda.Speaker2CompanyImg,
#             'Speaker2Id':agenda.Speaker2Id,
#             'created_at': agenda.created_at,
#             'updated_at': agenda.updated_at,
#             'created_by': agenda.created_by,
#             'updated_by': agenda.updated_by,
#         }
#         agendaListData.append(x)
#     return JsonResponse({'agendaList': agendaListData, 'status': True})

#---------------------------- Api For Get Who Should Attend Page Static Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def whoShouldAttendPageDataFun(request):
    whoShouldAttendPageData_list = whoShouldAttendPageData.objects.all().filter(isDelete='No').order_by('-id')
    whoShouldAttendPageDataArr = []
    for item in whoShouldAttendPageData_list:
        x={
            'id':item.id,
            'sectionFirstTitle':item.sectionFirstTitle,
            'sectionFirstBoldDescription':item.sectionFirstBoldDescription,
            'sectionFirstPoints':item.sectionFirstPoints,
            'sectionFirstButtonLabel':item.sectionFirstButtonLabel,
            'sectionFirstButtonRedirectPath':item.sectionFirstButtonRedirectPath,
            'sectionFirstLeftImage':item.sectionFirstLeftImage,
            'sectionSecondTitle':item.sectionSecondTitle,
            'sectionSecondPoints':item.sectionSecondPoints,
            'sectionSecondButtonRedirectPath':item.sectionSecondButtonRedirectPath,
            'sectionSecondRightImage':item.sectionSecondRightImage,
            'sectionThreeTilte':item.sectionThreeTilte,
            'sectionThreeDescription':item.sectionThreeDescription,
            'sectionThreeTabOneTitle':item.sectionThreeTabOneTitle,
            'sectionThreeTabOneDescription':item.sectionThreeTabOneDescription,
            'sectionThreeTabTwoTitle':item.sectionThreeTabTwoTitle,
            'sectionThreeTabTwoDescription':item.sectionThreeTabTwoDescription,
            'sectionFourTilte':item.sectionFourTilte,
            'created_at': item.created_at,
            'updated_at': item.updated_at,
            'created_by': item.created_by,
            'updated_by': item.updated_by,
        }
        whoShouldAttendPageDataArr.append(x)
    return JsonResponse({'whoShouldAttendPageData': whoShouldAttendPageDataArr, 'status': True})

#---------------------------- Api For Get Event Core Attandees ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventCoreAttendeesFun(request):
    coreAttandees_list = eventCoreAttandees.objects.all().filter(isDelete='No')
    coreAttandeesList = []
    for attandee in coreAttandees_list:
        x={
            'id':attandee.id,
            'corAttandeeName':attandee.corAttandeeName,
            'created_at': attandee.created_at,
            'updated_at': attandee.updated_at,
            'created_by': attandee.created_by,
            'updated_by': attandee.updated_by,
        }
        coreAttandeesList.append(x)
    return JsonResponse({'coreAttandees': coreAttandeesList, 'status': True})

#---------------------------- Api For Get Event Participated Industries ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventParticipatedIndustriesFun(request):
    industry_list = eventParticipatedIndustries.objects.all().filter(isDelete='No')
    industryList = []
    for industry in industry_list:
        x={
            'id':industry.id,
            'industryName':industry.industryName,
            'created_at': industry.created_at,
            'updated_at': industry.updated_at,
            'created_by': industry.created_by,
            'updated_by': industry.updated_by,
        }
        industryList.append(x)
    return JsonResponse({'participatedIndustries': industryList, 'status': True})

#---------------------------- Api For Get Speaker Page Static Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def speakerPageStaticDataFun(request):
    speakerPageStaticData_list = speakerPageData.objects.all().filter(isDelete='No').order_by('-id')
    speakerPageStaticDataList = []
    for spData in speakerPageStaticData_list:
        x={
            'id':spData.id,
            'sectionFirstTitle':spData.sectionFirstTitle,
            'sectionFirstDescription':spData.sectionFirstDescription,
            'sectionFirstButtonLabel':spData.sectionFirstButtonLabel,
            'sectionFirstButtonRedirectPath':spData.sectionFirstButtonRedirectPath,
            'sectionFirstLeftImage':spData.sectionFirstLeftImage,
            'sectionSecondTitle':spData.sectionSecondTitle,
            'sectionSecondDescription':spData.sectionSecondDescription,
            'sectionSecondButtonLabel':spData.sectionSecondButtonLabel,
            'sectionSecondButtonRedirectPath':spData.sectionSecondButtonRedirectPath,
            'sectionSecondRightImage':spData.sectionSecondRightImage,
            'created_at': spData.created_at,
            'updated_at': spData.updated_at,
            'created_by': spData.created_by,
            'updated_by': spData.updated_by,
        }
        speakerPageStaticDataList.append(x)
    return JsonResponse({'speakerPageStaticData': speakerPageStaticDataList, 'status': True})

#---------------------------- Api For Get Speaker Page Section Three Static Points ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def speakerPageSecThreePointsFun(request):
    speakerPageSecThreePoints_list = speakerPageSectionThreePoints.objects.all().filter(isDelete='No').order_by('-id')
    speakerPageSecThreePointsList = []
    for pointData in speakerPageSecThreePoints_list:
        x={
            'id':pointData.id,
            'pointTitle':pointData.pointTitle,
            'pointDescription':pointData.pointDescription,
            'pointIcon':pointData.pointIcon,
            'created_at': pointData.created_at,
            'updated_at': pointData.updated_at,
            'created_by': pointData.created_by,
            'updated_by': pointData.updated_by,
        }
        speakerPageSecThreePointsList.append(x)
    return JsonResponse({'speakerPageSecThreePoints': speakerPageSecThreePointsList, 'status': True})

#---------------------------- Api For Get Sponsor Page Static Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorPageStaticDataFun(request):
    sponsorPageStaticData_list = sponsorPageData.objects.all().filter(isDelete='No').order_by('-id')
    sponsorPageStaticDataList = []
    for spoData in sponsorPageStaticData_list:
        x={
            'id':spoData.id,
            'introParaHeading':spoData.introParaHeading,
            'introParaDescription':spoData.introParaDescription,
            'introParaButtonLabel':spoData.introParaButtonLabel,
            'introParaButtonRedirectPath':spoData.introParaButtonRedirectPath,
            'introParaImage':spoData.introParaImage,

            'exhibitSectionTitle':spoData.exhibitSectionTitle,

            'exhibitSectionFirstBoxTitle':spoData.exhibitSectionFirstBoxTitle,
            'exhibitSectionFirstBoxShortDescription':spoData.exhibitSectionFirstBoxShortDescription,
            'exhibitSectionFirstBoxPoints':spoData.exhibitSectionFirstBoxPoints,

            'exhibitSectionSecondBoxTitle':spoData.exhibitSectionSecondBoxTitle,
            'exhibitSectionSecondBoxShortDescription':spoData.exhibitSectionSecondBoxShortDescription,
            'exhibitSectionSecondBoxPoints':spoData.exhibitSectionSecondBoxPoints,

            'exhibitSectionThirdBoxTitle':spoData.exhibitSectionThirdBoxTitle,
            'exhibitSectionThirdBoxShortDescription':spoData.exhibitSectionThirdBoxShortDescription,
            'exhibitSectionThirdBoxPoints':spoData.exhibitSectionThirdBoxPoints,

            'created_at': spoData.created_at,
            'updated_at': spoData.updated_at,
            'created_by': spoData.created_by,
            'updated_by': spoData.updated_by,
        }
        sponsorPageStaticDataList.append(x)
    return JsonResponse({'sponsorPageStaticData': sponsorPageStaticDataList, 'status': True})

#---------------------------- Api For Get Sponsor Page Bullet Points ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorPageBulletPointsFun(request):
    sponsorPageBulletPoints_list = sponsorPageBulletData.objects.all().filter(isDelete='No').order_by('-id')
    sponsorPageBulletPointsList = []
    for bulletData in sponsorPageBulletPoints_list:
        x={
            'id':bulletData.id,
            'pointIcon':bulletData.pointIcon,
            'pointShortDescription':bulletData.pointShortDescription,
            'created_at': bulletData.created_at,
            'updated_at': bulletData.updated_at,
            'created_by': bulletData.created_by,
            'updated_by': bulletData.updated_by,
        }
        sponsorPageBulletPointsList.append(x)
    return JsonResponse({'sponsorPageBulletPoints': sponsorPageBulletPointsList, 'status': True})

#---------------------------- Api For Get Venue Page Static Data ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def venuePageStaticDataFun(request):
    venuePageStaticData_list = venuePageData.objects.all().filter(isDelete='No').order_by('-id')
    venuePageStaticDataList = []
    for venData in venuePageStaticData_list:
        x={
            'id':venData.id,
            'venueFirstSectionLeftImage':venData.venueFirstSectionLeftImage,
            'venueFirstSectionFirstTitle':venData.venueFirstSectionFirstTitle,
            'venueFirstSectionSecondTitle':venData.venueFirstSectionSecondTitle,
            'venueFirstSectionDescription':venData.venueFirstSectionDescription,
            'venueAddressLink':venData.venueAddressLink,
            'venueFirstSectionButtonLabel':venData.venueFirstSectionButtonLabel,
            'venueMapSectionLabel':venData.venueMapSectionLabel,
            'venueMapSectionBackImage':venData.venueMapSectionBackImage,
            'venueLocation':venData.venueLocation,
            'venueContact':venData.venueContact,
            'venueWebsiteAddress':venData.venueWebsiteAddress,
            'venueMapLink':venData.venueMapLink,
            'created_at': venData.created_at,
            'updated_at': venData.updated_at,
            'created_by': venData.created_by,
            'updated_by': venData.updated_by,
        }
        venuePageStaticDataList.append(x)
    return JsonResponse({'venuePageStaticData': venuePageStaticDataList, 'status': True})

#---------------------------- Api For Get Venue Page Gallery Images  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def venuePageGalleryImagesFun(request):
    venuePageGalleryImages_list = venuePageGallery.objects.all().filter(isDelete='No').order_by('-id')
    venuePageGalleryImagesList = []
    for venImg in venuePageGalleryImages_list:
        x={
            'id':venImg.id,
            'gallerySectionOneBigImage':venImg.gallerySectionOneBigImage,
            'gallerySectionOneSmallImage':venImg.gallerySectionOneSmallImage,
            'gallerySectionTwoBigImage':venImg.gallerySectionTwoBigImage,
            'gallerySectionTwoSmallImage':venImg.gallerySectionTwoSmallImage,
            'gallerySectionThreeBigImage':venImg.gallerySectionThreeBigImage,
            'gallerySectionThreeSmallImage':venImg.gallerySectionThreeSmallImage,
            'created_at': venImg.created_at,
            'updated_at': venImg.updated_at,
            'created_by': venImg.created_by,
            'updated_by': venImg.updated_by,
        }
        venuePageGalleryImagesList.append(x)
    return JsonResponse({'venueGalleryImages': venuePageGalleryImagesList, 'status': True})

#---------------------------- Api For Get News Categories  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def newsCategoriesFun(request):
    newsCategories_list = newsCategory.objects.all().filter(isDelete='No').order_by('-id')
    newsCategoriesList = []
    for newsCat in newsCategories_list:
        x={
            'id':newsCat.id,
            'categoryName':newsCat.categoryName,
            'created_at': newsCat.created_at,
            'updated_at': newsCat.updated_at,
            'created_by': newsCat.created_by,
            'updated_by': newsCat.updated_by,
        }
        newsCategoriesList.append(x)
    return JsonResponse({'newsCategories': newsCategoriesList, 'status': True})

#---------------------------- Api For Get General News  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def generalNewsFun(request):
    generalNews_list = generalNewsPoint.objects.all().filter(isDelete='No').order_by("-newsCreatedDate")
    generalNewsList = []
    for genNews in generalNews_list:
        newsCat = {}
        if genNews.newsCategoryId != None:
            newsCat = {
                'id':genNews.newsCategoryId.id,
                'newsCategory':genNews.newsCategoryId.categoryName,
            }
        x={
            'id':genNews.id,
            'newsCategoryDetails':newsCat,
            'newsTitle':genNews.newsTitle,
            'newsDescription':genNews.newsDescription,
            'newsShortDescription':genNews.newsShortDescription,
            'newsPageUrl':genNews.newsPageUrl,
            'newsImage':genNews.newsImage,
            'newsCreatedDate':genNews.newsCreatedDate,
            'isTopNews':genNews.isTopNews,
            'newsMetaTitle':genNews.newsMetaTitle,
            'newsMetaDescription':genNews.newsMetaDescription,
            'newsImageAltText':genNews.newsImageAltText,
            'created_at': genNews.created_at,
            'updated_at': genNews.updated_at,
            'created_by': genNews.created_by,
            'updated_by': genNews.updated_by,
        }
        generalNewsList.append(x)
    return JsonResponse({'generalNews': generalNewsList, 'status': True})

#---------------------------- Api For Get Latest News  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def latestNewsFun(request):
    latestNews_list = latestNews.objects.all().filter(isDelete='No').order_by('-id')
    latestNewsList = []
    for latNews in latestNews_list:
        newsCat = {}
        genNews = {}
        if latNews.newsCategoryId != None:
            newsCat = {
                'id':latNews.newsCategoryId.id,
                'newsCategory':latNews.newsCategoryId.categoryName,
            }
        if latNews.generalNewsPointId != None:
            genNews = {
                'id':latNews.generalNewsPointId.id,
                'newsTitle':latNews.generalNewsPointId.newsTitle,
                'newsDescription':latNews.generalNewsPointId.newsDescription,
                'newsPageUrl':latNews.generalNewsPointId.newsPageUrl,
                'newsImage':latNews.generalNewsPointId.newsImage,
                'newsCreatedDate':latNews.generalNewsPointId.newsCreatedDate,
            }
        x={
            'id':genNews.id,
            'newsCategoryDetails':newsCat,
            'newsData':genNews,
            'created_at': latNews.created_at,
            'updated_at': latNews.updated_at,
            'created_by': latNews.created_by,
            'updated_by': latNews.updated_by,
        }
        latestNewsList.append(x)
    return JsonResponse({'latestNews': latestNewsList, 'status': True})

#---------------------------- Api For Get Top News  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def alltopNewsListFun(request):
    alltopNews_list = topNews.objects.all().filter(isDelete='No').order_by('-id')
    topNewsList = []
    for topNewsPoint in alltopNews_list:
        newsCat = {}
        genNews = {}
        if topNewsPoint.newsCategoryId != None:
            newsCat = {
                'id':topNewsPoint.newsCategoryId.id,
                'newsCategory':topNewsPoint.newsCategoryId.categoryName,
            }
        if topNewsPoint.generalNewsPointId != None:
            genNews = {
                'id':topNewsPoint.generalNewsPointId.id,
                'newsTitle':topNewsPoint.generalNewsPointId.newsTitle,
                'newsDescription':topNewsPoint.generalNewsPointId.newsDescription,
                'newsPageUrl':topNewsPoint.generalNewsPointId.newsPageUrl,
                'newsImage':topNewsPoint.generalNewsPointId.newsImage,
                'newsCreatedDate':topNewsPoint.generalNewsPointId.newsCreatedDate,
            }
        x={
            'id':genNews.id,
            'newsCategoryDetails':newsCat,
            'newsData':genNews,
            'created_at': topNewsPoint.created_at,
            'updated_at': topNewsPoint.updated_at,
            'created_by': topNewsPoint.created_by,
            'updated_by': topNewsPoint.updated_by,
        }
        topNewsList.append(x)
    return JsonResponse({'topNewsPoints': topNewsList, 'status': True})

#---------------------------- Api For Get Subscribers  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def subscribersFun(request):
    subscriber_list = subscribers.objects.all().filter(isDelete='No').order_by('-id')
    subscriberList = []
    for item in subscriber_list:
        x={
            'id':item.id,
            'subscriberName':item.subscriberName,
            'subscriberEmail':item.subscriberEmail,
            'created_at': item.created_at,
            'updated_at': item.updated_at,
            'created_by': item.created_by,
            'updated_by': item.updated_by,
        }
        subscriberList.append(x)
    return JsonResponse({'subscribersList': subscriberList, 'status': True})

#---------------------------- Api For Get Event Faqs List  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventFaqsFun(request):
    faqs_list = eventFaqs.objects.all().filter(isDelete='No').order_by('id')
    faqsList = []
    for faq in faqs_list:
        x={
            'id':faq.id,
            'faqQuestion':faq.faqQuestion,
            'faqAnswer':faq.faqAnswer,
            'created_at': faq.created_at,
            'updated_at': faq.updated_at,
            'created_by': faq.created_by,
            'updated_by': faq.updated_by,
        }
        faqsList.append(x)
    return JsonResponse({'faqsList': faqsList, 'status': True})

#------------------- Api For Get Contact Us Contact Data List  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def contatusContactsFun(request):
    contacts_list = contactUsData.objects.all().filter(isDelete='No').order_by('-id')
    contactsList = []
    for contact in contacts_list:
        x={
            'id':contact.id,
            'contactPersonName':contact.contactPersonName,
            'contactPersonCompanyName':contact.contactPersonCompanyName,
            'contactPersonEmail':contact.contactPersonEmail,
            'contactPersonMobile':contact.contactPersonMobile,
            'contactPersonMessage':contact.contactPersonMessage,
            'contactUsReason':contact.contactUsReason,
            'created_at': contact.created_at,
            'updated_at': contact.updated_at,
            'created_by': contact.created_by,
            'updated_by': contact.updated_by,
        }
        contactsList.append(x)
    return JsonResponse({'contatusContactsList': contactsList, 'status': True})

#------------------- Api For Delete Contact Us Request -------------------#
@api_view(['POST'])
def delete_contactUs_contact(request):
    response = request.data
    check_db = contactUsData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Contact Us Page Static Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def contatusDataFun(request):
    contactsUsData_list = contactUsPageData.objects.all().filter(isDelete='No').order_by('-id')
    contactUsDataList = []
    for cuData in contactsUsData_list:
        x={
            'id':cuData.id,
            'emailLogo':cuData.emailLogo,
            'sectionTitle':cuData.sectionTitle,
            'sectionShortParagraph':cuData.sectionShortParagraph,
            'created_at': cuData.created_at,
            'updated_at': cuData.updated_at,
            'created_by': cuData.created_by,
            'updated_by': cuData.updated_by,
        }
        contactUsDataList.append(x)
    return JsonResponse({'contatusPageStaticData': contactUsDataList, 'status': True})

#------------------- Api For Get Contact Us Page Helpers Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def contatusHelpersDataFun(request):
    contactsUsHelperData_list = contactUsHelpData.objects.all().filter(isDelete='No').order_by('id')
    contactUsHelperDataList = []
    for helperData in contactsUsHelperData_list:
        x={
            'id':helperData.id,
            'reasonToHelp':helperData.reasonToHelp,
            'helpingPersonName':helperData.helpingPersonName,
            'helpingPersonDesignation':helperData.helpingPersonDesignation,
            'helpingPersonEmail':helperData.helpingPersonEmail,
            'created_at': helperData.created_at,
            'updated_at': helperData.updated_at,
            'created_by': helperData.created_by,
            'updated_by': helperData.updated_by,
        }
        contactUsHelperDataList.append(x)
    return JsonResponse({'contactUsHelpers': contactUsHelperDataList, 'status': True})

#------------------- Api For Get Press Media Page Static Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def pressMediaDataFun(request):
    pressMediaData_list = pressMediaPageData.objects.all().filter(isDelete='No').order_by('-id')
    pressMediaDataList = []
    for pressData in pressMediaData_list:
        x={
            'id':pressData.id,
            'pressMediaPageTitle':pressData.pressMediaPageTitle,
            'pressMediaPageDescription':pressData.pressMediaPageDescription,
            'pressMediaPageSecondTitle':pressData.pressMediaPageSecondTitle,
            'pressMediaPageSecondSectionImage':pressData.pressMediaPageSecondSectionImage,
            'created_at': pressData.created_at,
            'updated_at': pressData.updated_at,
            'created_by': pressData.created_by,
            'updated_by': pressData.updated_by,
        }
        pressMediaDataList.append(x)
    return JsonResponse({'pressMediaStaticData': pressMediaDataList, 'status': True})

#------------------- Api For Get Press Media Page Box Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def pressMediaBoxDataFun(request):
    pressMediaBoxData_list = pressMediaPageBoxData.objects.all().filter(isDelete='No').order_by('-id')
    pressMediaBoxDataList = []
    for pressBoxData in pressMediaBoxData_list:
        x={
            'id':pressBoxData.id,
            'boxTitle':pressBoxData.boxTitle, 
            'boxDescription':pressBoxData.boxDescription,
            'created_at': pressBoxData.created_at,
            'updated_at': pressBoxData.updated_at,
            'created_by': pressBoxData.created_by,
            'updated_by': pressBoxData.updated_by,
        }
        pressMediaBoxDataList.append(x)
    return JsonResponse({'pressMediaBoxData': pressMediaBoxDataList, 'status': True})


#---------------------------- Api For get List of Registered Companies  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def registeredCompaniesFun(request):
    registeredCompanies_list = registeredCompanyDetails.objects.all().filter(isDelete='No').order_by('-id')
    registeredCompaniesList = []
    for com in registeredCompanies_list:
        purchasedPackage = {}
        if com.purchasedDelegatePackageId != None:
            purchasedPackage = {
                'id':com.purchasedDelegatePackageId.id,
                'deligatePackageName':com.purchasedDelegatePackageId.deligatePackageName,
                'deligatePackagePrice':com.purchasedDelegatePackageId.deligatePackagePrice,
            }
        x={
            'id':com.id,
            'purchasedPackageDetails':purchasedPackage,
            'companyName':com.companyName,
            'companyWebsite':com.companyWebsite,
            'companyAddress':com.companyAddress,
            'companyCountry':com.companyCountry,
            'companyState':com.companyState,
            'companyCity':com.companyCity,
            'companyPincode':com.companyPincode,
            'created_at': com.created_at,
            'updated_at': com.updated_at,
            'created_by': com.created_by,
            'updated_by': com.updated_by,
        }
        registeredCompaniesList.append(x)
    return JsonResponse({'registeredCompanies': registeredCompaniesList, 'status': True})

#---------------------------- Api For get List of Registered Delegates  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def registeredDelegatesFun(request):
    registeredDelegates_list = registeredDelegates.objects.all().filter(isDelete='No').order_by('-id')
    registeredDelegatesList = []
    for dele in registeredDelegates_list:
        relatedComapny = {}
        if dele.relatedCompanyId != None:
            relatedComapny = {
                'id':dele.relatedCompanyId.id,
                'companyName':dele.relatedCompanyId.companyName,
            }
            
        x={
            'id':dele.id,
            'relatedComapanyDetails':relatedComapny,
            'firstName':dele.firstName,
            'lastName':dele.lastName,
            'mobile':dele.mobile,
            'position':dele.position,
            'delegateEmail':dele.delegateEmail,
            'created_at': dele.created_at,
            'updated_at': dele.updated_at,
            'created_by': dele.created_by,
            'updated_by': dele.updated_by,
        }
        registeredDelegatesList.append(x)
    return JsonResponse({'registeredDelegates': registeredDelegatesList, 'status': True})

#---------------------------- Api For get List of Delegate Package Add Ons  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def delegateAddOnsFun(request):
    delegateAddOns_list = delegatesAddOns.objects.all().filter(isDelete='No')
    delegateAddOnsList = []
    for addOn in delegateAddOns_list:  
        x={
            'id':addOn.id,
            'addOnPointName':addOn.addOnPointName,
            'additionalPrice':addOn.additionalPrice,
            'created_at': addOn.created_at,
            'updated_at': addOn.updated_at,
            'created_by': addOn.created_by,
            'updated_by': addOn.updated_by,
        }
        delegateAddOnsList.append(x)
    return JsonResponse({'delegateAddOns': delegateAddOnsList, 'status': True})

#---------------------------- Api For get List of Payment Option Image  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def paymentOptionImagesFun(request):
    paymentOptionImages_list = paymentOptionImage.objects.all().filter(isDelete='No').order_by('-id')
    paymentOptionImagesList = []
    for payimg in paymentOptionImages_list:  
        x={
            'id':payimg.id,
            'paymentOptionImageLink':payimg.paymentOptionImageLink,
            'created_at': payimg.created_at,
            'updated_at': payimg.updated_at,
            'created_by': payimg.created_by,
            'updated_by': payimg.updated_by,
        }
        paymentOptionImagesList.append(x)
    return JsonResponse({'paymentImages': paymentOptionImagesList, 'status': True})

#---------------------------- Api For get List of Offer Coupons  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def offerCouponsFun(request):
    offerCoupons_list = offerCoupon.objects.all().filter(isDelete='No')
    offerCouponsList = []
    for coupon in offerCoupons_list:  
        x={
            'id':coupon.id,
            'couponCode':coupon.couponCode,
            'discountType':coupon.discountType,
            'discountAmount':coupon.discountAmount,
            'couponFor':coupon.couponFor,
            'eventSpecialWord':coupon.eventSpecialWord,
            'created_at': coupon.created_at,
            'updated_at': coupon.updated_at,
            'created_by': coupon.created_by,
            'updated_by': coupon.updated_by,
        }
        offerCouponsList.append(x)
    return JsonResponse({'offerCoupons': offerCouponsList, 'status': True})

#---------------------------- Api For get Delegate Transections  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def delegateTransectionsFun(request):
    delegateTransections_list = delegateTransectionData.objects.all().filter(isDelete='No').order_by('-id')
    delegateTransectionsList = []
    for trans in delegateTransections_list:  
        relatedComapny = {}
        if trans.relatedCompanyId != None:
            relatedComapny = {
                'id':trans.relatedCompanyId.id,
                'companyName':trans.relatedCompanyId.companyName,
            }
        x={
            'id':trans.id,
            'relatedComapanyDetails':relatedComapny,
            'invoiceNo':trans.invoiceNo,
            'totalPassAmount':trans.totalPassAmount,
            'discountAmount':trans.discountAmount,
            'addOnsAmount':trans.addOnsAmount,
            'taxableCharge':trans.taxableCharge,
            'totalPaidAmount':trans.totalPaidAmount,
            'transectionId':trans.transectionId,
            'transectionType':trans.transectionType,
            'created_at': trans.created_at,
            'updated_at': trans.updated_at,
            'created_by': trans.created_by,
            'updated_by': trans.updated_by,
        }
        delegateTransectionsList.append(x)
    return JsonResponse({'delegateTransectionsList': delegateTransectionsList, 'status': True})

#---------------------------- Api For get Event General Settings  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventGeneralSettingsFun(request):
    eventGeneralSettings_list = eventGeneralSettings.objects.all().filter(isDelete='No').order_by('-id')
    eventGeneralSettingsList = []
    for i in eventGeneralSettings_list:  
        x={
            'id':i.id,
            'purchaseTaxPercent':i.purchaseTaxPercent,
            'currencyName':i.currencyName,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        eventGeneralSettingsList.append(x)
    return JsonResponse({'eventGeneralSettings': eventGeneralSettingsList, 'status': True})

#---------------------------- Api For get Offer Coupon Usage History  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def offerCouponistoryFun(request):
    offerCouponistory_list = offerCouponHistory.objects.all().filter(isDelete='No').order_by('-id')
    offerCouponistoryList = []
    for i in offerCouponistory_list:
        relatedComapny = {}
        relatedOfferCoupon = {}
        if i.relatedCompanyId != None:
            relatedComapny = {
                'id':i.relatedCompanyId.id,
                'companyName':i.relatedCompanyId.companyName,
            }  
        if i.offerCouponId != None:
            relatedOfferCoupon = {
                'id':i.offerCouponId.id,
                'couponCode':i.offerCouponId.couponCode,
            }
        x={
            'id':i.id,
            'companyDetails':relatedComapny,
            'OfferCouponDetails':relatedOfferCoupon,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        offerCouponistoryList.append(x)
    return JsonResponse({'offerCouponUsageHistory': offerCouponistoryList, 'status': True})

#---------------------------- Api For get Add Ons Purchase History  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def addOnPurchaseHistoryFun(request):
    addOnPurchaseHistory_list = addOnsHistory.objects.all().filter(isDelete='No').order_by('-id')
    addOnPurchaseHistoryList = []
    addOnDetais ={}
    relatedComapny = {}
    for i in addOnPurchaseHistory_list:
        if i.addOnId != None:
            addOnDetais = {
                'id':i.addOnId.id,
                'addOnPointName':i.addOnId.addOnPointName,
            }
        if i.relatedCompanyId != None:
            relatedComapny = {
                'id':i.relatedCompanyId.id,
                'companyName':i.relatedCompanyId.companyName,
            }  
        x={
            'id':i.id,
            'addOnDetails': addOnDetais,
            'companyDetails': relatedComapny,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        addOnPurchaseHistoryList.append(x)
    return JsonResponse({'addOnPurchaseHistoryList': addOnPurchaseHistoryList, 'status': True})

#---------------------------- Api For get List Of Sponsor Benifits  ----------------------------#
# @permission_classes((AllowAny,))
# @api_view(['GET'])
# def sponsorBenifitsFun(request):
#     sponsorBenifits_list = sponsorBenefits.objects.all().filter(isDelete='No').order_by('-id')
#     sponsorBenifitsList = []
#     for i in sponsorBenifits_list:
#         x={
#             'id':i.id,
#             'benefitTitle': i.benefitTitle,
#             'benefitInfo': i.benefitInfo,
#             'created_at': i.created_at,
#             'updated_at': i.updated_at,
#             'created_by': i.created_by,
#             'updated_by': i.updated_by,
#         }
#         sponsorBenifitsList.append(x)
#     return JsonResponse({'sponsorPackageBenifits': sponsorBenifitsList, 'status': True})

#---------------------------- Api For get List Of Sponsor Package Types  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorPackageTypesFun(request):
    sponsorPackageTypes_list = sponsorPackageTypes.objects.all().filter(isDelete='No')
    sponsorPackageTypesList = []
    for i in sponsorPackageTypes_list:
        x={
            'id':i.id,
            'sponsorPackageType': i.sponsorPackageType,
            'sponsorPackagePrice': i.sponsorPackagePrice,
            'sponsorPackageCuttingPrice': i.sponsorPackageCuttingPrice,
            'delegatePassQty': i.delegatePassQty,
            'inviteDiscount': i.inviteDiscount,
            'exhibitSpace': i.exhibitSpace,
            'sponsorPackageShowOrder': i.sponsorPackageShowOrder,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsorPackageTypesList.append(x)
    return JsonResponse({'sponsorPackageTypes': sponsorPackageTypesList, 'status': True})

#---------------------------- Api For get List Of Sponsor Package Inclusions  ----------------------------#
# @permission_classes((AllowAny,))
# @api_view(['GET'])
# def sponsorPackageInclusionsFun(request):
#     sponsorPackageInclusions_list = sponsorPackageInclusions.objects.all().filter(isDelete='No').order_by('-id')
#     sponsorPackageInclusionsList = []
#     for i in sponsorPackageInclusions_list:
#         relatedSponsorPackage = {}
#         relatedSponsorBenefit = {}
#         if i.sponsorPackageTypeId != None:
#             relatedSponsorPackage = {
#                 'id':i.sponsorPackageTypeId.id,
#                 'sponsorPackageType':i.sponsorPackageTypeId.sponsorPackageType,
#                 'sponsorPackagePrice':i.sponsorPackageTypeId.sponsorPackagePrice,
#                 'sponsorPackageCuttingPrice':i.sponsorPackageTypeId.sponsorPackageCuttingPrice,
#             }
#         if i.sponsorBenifitId != None:
#             relatedSponsorBenefit = {
#                 'id':i.sponsorBenifitId.id,
#                 'benefitTitle':i.sponsorBenifitId.benefitTitle,
#                 'benefitInfo':i.sponsorBenifitId.benefitInfo,
#             }  
#         x={
#             'id':i.id,
#             'sposorPackage': relatedSponsorPackage,
#             'sponsorBenefit': relatedSponsorBenefit,
#             'benefitValue': i.benefitValue,
#             'created_at': i.created_at,
#             'updated_at': i.updated_at,
#             'created_by': i.created_by,
#             'updated_by': i.updated_by,
#         }
#         sponsorPackageInclusionsList.append(x)
#     return JsonResponse({'sponsorPackageInclusions': sponsorPackageInclusionsList, 'status': True})

#---------------------------- Api For get List Of Sponsor Package Add On Types  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorPackageAddonTypesFun(request):
    sponsorPackageAddonTypes_list = sponsorPackageAddOnTypes.objects.all().filter(isDelete='No')
    sponsorPackageAdonTypesList = []
    for i in sponsorPackageAddonTypes_list:
        x={
            'id':i.id,
            'addOnTypeName': i.addOnTypeName,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsorPackageAdonTypesList.append(x)
    return JsonResponse({'sponsorPackageAddOnTypes': sponsorPackageAdonTypesList, 'status': True})

#---------------------------- Api For get List Of Sponsor Package Add Ons  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorPackageAddonsFun(request):
    sponsorPackageAddons_list = sponsorPackageAddOns.objects.all().filter(isDelete='No')
    sponsorPackageAddonsList = []
    for i in sponsorPackageAddons_list:
        relatedAddOnTypes = {}
        if i.sponsorPackageAddOnTypeId != None:
            relatedAddOnTypes = {
                'id':i.sponsorPackageAddOnTypeId.id,
                'addOnTypeName':i.sponsorPackageAddOnTypeId.addOnTypeName,
            }
        x={
            'id':i.id,
            'addOnTypeDetails': relatedAddOnTypes,
            'sponsorAddOnName': i.sponsorAddOnName,
            'sponsorAddOnPrice': i.sponsorAddOnPrice,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsorPackageAddonsList.append(x)
    return JsonResponse({'sponsorPackageAddOns': sponsorPackageAddonsList, 'status': True})

#---------------------------- Api For get List Of Sponsored Companies  ----------------------------#
# @permission_classes((AllowAny,))
# @api_view(['GET'])
# def sponsoredCompaniesFun(request):
#     sponsoredCompanies_list = sponseredCompanyDetails.objects.all().filter(isDelete='No').order_by('-id')
#     sponsoredCompaniesList = []
#     for i in sponsoredCompanies_list:
#         relatedSponsorPackage = {}
#         if i.sponsorPackageTypeId != None:
#             relatedSponsorPackage = {
#                 'id':i.sponsorPackageTypeId.id,
#                 'sponsorPackageType':i.sponsorPackageTypeId.sponsorPackageType,
#                 'sponsorPackagePrice':i.sponsorPackageTypeId.sponsorPackagePrice,
#                 'sponsorPackageCuttingPrice':i.sponsorPackageTypeId.sponsorPackageCuttingPrice,
#             }
#         x={
#             'id':i.id,
#             'relatedSponsorPackage': relatedSponsorPackage,
#             'companyName': i.companyName,
#             'companyWebsite': i.companyWebsite,
#             'companyAddress': i.companyAddress,
#             'companyCountry': i.companyCountry,
#             'companyState': i.companyState,
#             'companyCity': i.companyCity,
#             'companyPincode': i.companyPincode,
#             'created_at': i.created_at,
#             'updated_at': i.updated_at,
#             'created_by': i.created_by,
#             'updated_by': i.updated_by,
#         }
#         sponsoredCompaniesList.append(x)
#     return JsonResponse({'sponsoredCompanies': sponsoredCompaniesList, 'status': True})

#---------------------------- Api For get List Of Sponsored Delegates  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsoredDelegatesFun(request):
    sponsoredDelegates_list = registeredSponseredDelegates.objects.all().filter(isDelete='No').order_by('-id')
    sponsoredDelegatesList = []
    for i in sponsoredDelegates_list:
        relatedSponsorCompany = {}
        if i.relatedSponsorCompanyId != None:
            relatedSponsorCompany = {
                'id':i.relatedSponsorCompanyId.id,
                'companyName':i.relatedSponsorCompanyId.companyName,
            }
        x={
            'id':i.id,
            'relatedSponsorCompany': relatedSponsorCompany,
            'firstName': i.firstName,
            'lastName': i.lastName,
            'mobile': i.mobile,
            'position': i.position,
            'delegateEmail': i.delegateEmail,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsoredDelegatesList.append(x)
    return JsonResponse({'sponsoredDelegates': sponsoredDelegatesList, 'status': True})

#---------------------------- Api For get List Of Sponsored Company Add Ons  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsoredCompanyAddOnsFun(request):
    sponsoredCompanyAddOns_list = sponsoredCompanyAddOnsDetails.objects.all().filter(isDelete='No').order_by('-id')
    sponsoredCompanyAddOnsList = []
    for i in sponsoredCompanyAddOns_list:
        relatedSponsorCompany = {}
        relatedSponsorAddOn = {}
        if i.relatedSponsorCompanyId != None:
            relatedSponsorCompany = {
                'id':i.relatedSponsorCompanyId.id,
                'companyName':i.relatedSponsorCompanyId.companyName,
            }
        if i.relatedSponsorAddOnsId != None:
            relatedSponsorCompany = {
                'id':i.relatedSponsorAddOnsId.id,
                'sponsorAddOnName':i.relatedSponsorAddOnsId.sponsorAddOnName,
                'sponsorAddOnPrice':i.relatedSponsorAddOnsId.sponsorAddOnPrice,
            }
        x={
            'id':i.id,
            'relatedSponsorCompany': relatedSponsorCompany,
            'relatedSponsorAddOn': relatedSponsorAddOn,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsoredCompanyAddOnsList.append(x)
    return JsonResponse({'sponsoredCompanyAddOns': sponsoredCompanyAddOnsList, 'status': True})

#---------------------------- Api For get List Of Sponsored Company Transections  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsoredCompanyTransectionsFun(request):
    sponsoredCompanyTransections_list = sponsorCompanyTransectionData.objects.all().filter(isDelete='No').order_by('-id')
    sponsoredCompanyTransectionsList = []
    for i in sponsoredCompanyTransections_list:
        relatedSponsorCompany = {}
        if i.relatedSponsorCompanyId != None:
            relatedSponsorCompany = {
                'id':i.relatedSponsorCompanyId.id,
                'companyName':i.relatedSponsorCompanyId.companyName,
            }
        x={
            'id':i.id,
            'relatedSponsorCompany': relatedSponsorCompany,
            'invoiceNo': i.invoiceNo,
            'totalPassAmount': i.totalPassAmount,
            'discountAmount': i.discountAmount,
            'addOnsAmount': i.addOnsAmount,
            'taxableCharge': i.taxableCharge,
            'totalPaidAmount': i.totalPaidAmount,
            'transectionId': i.transectionId,
            'transectionType': i.transectionType,
            'created_at': i.created_at,
            'updated_at': i.updated_at,
            'created_by': i.created_by,
            'updated_by': i.updated_by,
        }
        sponsoredCompanyTransectionsList.append(x)
    return JsonResponse({'sponsoredCompanyTransections': sponsoredCompanyTransectionsList, 'status': True})

#------------------- Api For Get Group Pass Registration Request Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def groupPassRegistrationRequestDataFun(request):
    groupPassRegistrationRequestData_list = groupPassRegistrationRequestData.objects.all().filter(isDelete='No').order_by('-id')
    groupPassRegistrationRequestDataList = []
    for item in groupPassRegistrationRequestData_list:
        x={
            'id':item.id,
            'requesterName':item.requesterName, 
            'requesterCompanyName':item.requesterCompanyName,
            'requesterEmail':item.requesterEmail,
            'requesterMobile':item.requesterMobile,
            'requesterInterest':item.requesterInterest,
            'noOfAttandees':item.noOfAttandees,
            'requesterMessage':item.requesterMessage,
            'created_at': item.created_at,
            'updated_at': item.updated_at,
            'created_by': item.created_by,
            'updated_by': item.updated_by,
        }
        groupPassRegistrationRequestDataList.append(x)
    return JsonResponse({'pressMediaBoxData': groupPassRegistrationRequestDataList, 'status': True})

#------------------- Api For Get Tagline Data  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def taglineDataFun(request):
    taglineData_list = homePageThirdSection.objects.all().filter(isDelete='No').order_by('-id')
    tglineData = []
    for item in taglineData_list:
        x={
            'id':item.id,
            'thirdSectionFirstTitle':item.thirdSectionFirstTitle, 
            'thirdSectionSecondTitle':item.thirdSectionSecondTitle,
            'thirdSectionDescription':item.thirdSectionDescription,
            'thirdSectionVideoLink':item.thirdSectionVideoLink,
            'thirdSectionBackgroundImage':item.thirdSectionBackgroundImage,
            'created_at': item.created_at,
            'updated_at': item.updated_at,
            'created_by': item.created_by,
            'updated_by': item.updated_by,
        }
        tglineData.append(x)
    return JsonResponse({'taglineData': tglineData, 'status': True})

#------------------- Api For Add Theme General Settings  -------------------#
@api_view(['POST'])
def add_theme_colors(request):
    response = request.data
    check_db = themeColorSettings()

    if 'primaryColor' in request.POST:
        check_db.primaryColor = response['primaryColor']

    if 'secondaryColor' in request.POST:
        check_db.secondaryColor = response['secondaryColor']

    if 'lightColor' in request.POST:
        check_db.lightColor = response['lightColor']

    if 'darkColor' in request.POST:
        check_db.darkColor = response['darkColor']

    if 'gradientColor' in request.POST:
        check_db.gradientColor = response['gradientColor']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Event General Settings -------------------#
@api_view(['POST'])
def add_eventGeneralSetting(request):
    response = request.data
    check_db = eventGeneralSettings()

    if 'purchaseTaxPercent' in request.POST:
        check_db.purchaseTaxPercent = response['purchaseTaxPercent']

    if 'currencyName' in request.POST:
        check_db.currencyName = response['currencyName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Nav Logos  -------------------#
@api_view(['POST'])
def add_nav_logos(request):
    response = request.data
    check_db = homePageNavLogoData()

    if 'whiteLogoLink' in request.POST:
        check_db.whiteLogoLink = response['whiteLogoLink']

    if 'blackLogoLink' in request.POST:
        check_db.blackLogoLink = response['blackLogoLink']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Nav Main Category  -------------------#
@api_view(['POST'])
def add_nav_mainCategory(request):
    response = request.data
    check_db = homePageNavMainCategories()

    if 'navMainCategoryName' in request.POST:
        check_db.navMainCategoryName = response['navMainCategoryName']

    if 'navMainCategoryPath' in request.POST:
        check_db.navMainCategoryPath = response['navMainCategoryPath']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Nav Main Category-------------------#
@api_view(['POST'])
def edit_nav_mainCategory(request):
    response = request.data
    check_db = homePageNavMainCategories.objects.get(id=response['id'])

    if 'navMainCategoryName' in request.POST:
        check_db.navMainCategoryName = response['navMainCategoryName']

    if 'navMainCategoryPath' in request.POST:
        check_db.navMainCategoryPath = response['navMainCategoryPath']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Nav Main Category -------------------#
@api_view(['POST'])
def delete_nav_mainCategory(request):
    response = request.data
    check_db = homePageNavMainCategories.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Nav Sub Category  -------------------#
@api_view(['POST'])
def add_nav_subCategory(request):
    response = request.data
    check_db = homePageNavSubCategories()

    if 'navMainCategoryId' in request.POST:
        navMainCategoryData = homePageNavMainCategories.objects.get(id=response['navMainCategoryId'])
        check_db.navMainCategoryId = navMainCategoryData

    if 'navSubCategoryName' in request.POST:
        check_db.navSubCategoryName = response['navSubCategoryName']

    if 'navSubCategoryPath' in request.POST:
        check_db.navSubCategoryPath = response['navSubCategoryPath']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Nav Sub Category-------------------#
@api_view(['POST'])
def edit_nav_subCategory(request):
    response = request.data
    check_db = homePageNavSubCategories.objects.get(id=response['id'])

    if 'navMainCategoryId' in request.POST:
        navMainCategoryData = homePageNavMainCategories.objects.get(id=response['navMainCategoryId'])
        check_db.navMainCategoryId = navMainCategoryData

    if 'navSubCategoryName' in request.POST:
        check_db.navSubCategoryName = response['navSubCategoryName']

    if 'navSubCategoryPath' in request.POST:
        check_db.navSubCategoryPath = response['navSubCategoryPath']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Nav Main Category -------------------#
@api_view(['POST'])
def delete_nav_subCategory(request):
    response = request.data
    check_db = homePageNavSubCategories.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Video Section static content   -------------------#
@api_view(['POST'])
def add_videoSection_staticInput(request):
    response = request.data
    check_db = homePageVideoSectionInput()

    if 'videoLink' in request.POST:
        check_db.videoLink = response['videoLink']

    if 'eventDetailBackImage' in request.POST:
        check_db.eventDetailBackImage = response['eventDetailBackImage']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Video Section User Options   -------------------#
@api_view(['POST'])
def add_videoSection_userOptions(request):
    response = request.data
    check_db = videoSectionUserOptions()

    if 'videoSectionUserOptionName' in request.POST:
        check_db.videoSectionUserOptionName = response['videoSectionUserOptionName']

    if 'videoSectionUserOptionShortDescription' in request.POST:
        check_db.videoSectionUserOptionShortDescription = response['videoSectionUserOptionShortDescription']

    if 'videoSectionUserOptionOrderNo' in request.POST:
        check_db.videoSectionUserOptionOrderNo = response['videoSectionUserOptionOrderNo']

    if 'videoSectionUserOptionArrowIcon' in request.POST:
        check_db.videoSectionUserOptionArrowIcon = response['videoSectionUserOptionArrowIcon']

    if 'videoSectionUserOptionRedirectRoute' in request.POST:
        check_db.videoSectionUserOptionRedirectRoute = response['videoSectionUserOptionRedirectRoute']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Event Detail   -------------------#
@api_view(['POST'])
def add_event(request):
    response = request.data
    check_db = eventDetails()

    if 'eventName' in request.POST:
        check_db.eventName = response['eventName']

    if 'eventType' in request.POST:
        check_db.eventType = response['eventType']

    if 'eventYear' in request.POST:
        check_db.eventYear = response['eventYear']

    if 'eventDate' in request.POST:
        check_db.eventDate = response['eventDate']

    if 'eventLocation' in request.POST:
        check_db.eventLocation = response['eventLocation']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Speaker Section Data   -------------------#
@api_view(['POST'])
def add_home_speakerSectionData(request):
    response = request.data
    check_db = speakerSection()

    if 'speakerSectionFirstTitle' in request.POST:
        check_db.speakerSectionFirstTitle = response['speakerSectionFirstTitle']

    if 'speakerSectionSecondTitle' in request.POST:
        check_db.speakerSectionSecondTitle = response['speakerSectionSecondTitle']

    if 'speakerSectionButtonTitle' in request.POST:
        check_db.speakerSectionButtonTitle = response['speakerSectionButtonTitle']

    if 'speakerSectionButtonIcon' in request.POST:
        check_db.speakerSectionButtonIcon = response['speakerSectionButtonIcon']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Home Page Third Section Data   -------------------#
@api_view(['POST'])
def add_home_thirdSectionData(request):
    response = request.data
    check_db = homePageThirdSection.objects.get(id=1)

    if 'thirdSectionFirstTitle' in request.POST:
        check_db.thirdSectionFirstTitle = response['thirdSectionFirstTitle']

    if 'thirdSectionSecondTitle' in request.POST:
        check_db.thirdSectionSecondTitle = response['thirdSectionSecondTitle']

    if 'thirdSectionDescription' in request.POST:
        check_db.thirdSectionDescription = response['thirdSectionDescription']

    if 'thirdSectionVideoLink' in request.POST:
        check_db.thirdSectionVideoLink = response['thirdSectionVideoLink']

    if 'thirdSectionBackgroundImage' in request.POST:
        check_db.thirdSectionBackgroundImage = response['thirdSectionBackgroundImage']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Key Point Section Static Data   -------------------#
@api_view(['POST'])
def add_home_keyPointSectionData(request):
    response = request.data
    check_db = keyPointsSection()

    if 'keyPointSectionLabel' in request.POST:
        check_db.keyPointSectionLabel = response['keyPointSectionLabel']

    if 'keyPointSectionButtonLabel' in request.POST:
        check_db.keyPointSectionButtonLabel = response['keyPointSectionButtonLabel']

    if 'keyPointSectionButtonRedirectPath' in request.POST:
        check_db.keyPointSectionButtonRedirectPath = response['keyPointSectionButtonRedirectPath']

    if 'isKeyPointSectionButtonEnable' in request.POST:
        check_db.isKeyPointSectionButtonEnable = response['isKeyPointSectionButtonEnable']
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#-----------Api For Key Points List-----------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def keyPointsListFun(request):
    keyPoints_Data = keyPointsSectionPoints.objects.all().filter(isDelete='No').order_by('-id')
    keyPointsOptions = []
    for point in keyPoints_Data:
        x={
            'id':point.id,
            'pointLabel':point.pointLabel,
            'pointDescription':point.pointDescription,
            'created_at': point.created_at,
            'updated_at': point.updated_at,
            'created_by': point.created_by,
            'updated_by': point.updated_by,
        }
        keyPointsOptions.append(x)
    return JsonResponse({'keyPointsList': keyPointsOptions, 'status': True})

#------------------- Api For Delete Key Point -------------------#
@api_view(['POST'])
def delete_keyPoint(request):
    response = request.data
    check_db = keyPointsSectionPoints.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Key Point-------------------#
@api_view(['POST'])
def add_keyPoint(request):
    response = request.data
    check_db = keyPointsSectionPoints()

    if 'pointLabel' in request.POST:
        check_db.pointLabel = response['pointLabel']

    if 'pointDescription' in request.POST:
        check_db.pointDescription = response['pointDescription']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Key Point-------------------#
@api_view(['POST'])
def edit_keyPoint(request):
    response = request.data
    check_db = keyPointsSectionPoints.objects.get(id=response['id'])

    if 'pointLabel' in request.POST:
        check_db.pointLabel = response['pointLabel']

    if 'pointDescription' in request.POST:
        check_db.pointDescription = response['pointDescription']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Count Section Background Image-------------------#
@api_view(['POST'])
def add_home_countSectionImage(request):
    response = request.data
    check_db = countSection()

    if 'countSectionBackgroundImage' in request.POST:
        check_db.countSectionBackgroundImage = response['countSectionBackgroundImage']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Event Statatics------------------#
@api_view(['GET'])
def eventStataticsFun(request):
    countPoints_Data = countSectionTopic.objects.all().filter(isDelete='No')
    countPointsOptions = []
    for countPoint in countPoints_Data:
        x={
            'id':countPoint.id,
            'topicLabel':countPoint.topicLabel,
            'topicCount':countPoint.topicCount,
            'countIcon':countPoint.countIcon,
            'created_at': countPoint.created_at,
            'updated_at': countPoint.updated_at,
            'created_by': countPoint.created_by,
            'updated_by': countPoint.updated_by,
        }
        countPointsOptions.append(x)
    return JsonResponse({'eventStatatics': countPointsOptions, 'status': True})

#------------------- Api For Add Count Section Topics-------------------#
@api_view(['POST'])
def add_home_countSectionTopics(request):
    response = request.data
    check_db = countSectionTopic()

    if 'topicLabel' in request.POST:
        check_db.topicLabel = response['topicLabel']
    if 'topicCount' in request.POST:
        check_db.topicCount = response['topicCount']
    if 'countIcon' in request.POST:
        check_db.countIcon = response['countIcon']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Count Section Topics-------------------#
@api_view(['POST'])
def edit_home_countSectionTopics(request):
    response = request.data
    check_db = countSectionTopic.objects.get(id=response['id'])

    if 'topicLabel' in request.POST:
        check_db.topicLabel = response['topicLabel']
    if 'topicCount' in request.POST:
        check_db.topicCount = response['topicCount']
    if 'countIcon' in request.POST:
        check_db.countIcon = response['countIcon']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Count Section Topics -------------------#
@api_view(['POST'])
def delete_home_countSectionTopics(request):
    response = request.data
    check_db = countSectionTopic.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Testimonial Section Static Data -------------------#
@api_view(['POST'])
def add_home_testimonialSectionStaticData(request):
    response = request.data
    check_db = testimonialSection()

    if 'testimonialSectionLabel' in request.POST:
        check_db.testimonialSectionLabel = response['testimonialSectionLabel']
    if 'testimonialLogo' in request.POST:
        check_db.testimonialLogo = response['testimonialLogo']
    if 'firstTestimonialFirstImage' in request.POST:
        check_db.firstTestimonialFirstImage = response['firstTestimonialFirstImage']
    if 'firstTestimonialSecondImage' in request.POST:
        check_db.firstTestimonialSecondImage = response['firstTestimonialSecondImage']
    if 'secondTestimonialRightFirstImage' in request.POST:
        check_db.secondTestimonialRightFirstImage = response['secondTestimonialRightFirstImage']
    if 'secondTestimonialRightSecondImage' in request.POST:
        check_db.secondTestimonialRightSecondImage = response['secondTestimonialRightSecondImage']
    if 'secondTestimonialLeftFirstImage' in request.POST:
        check_db.secondTestimonialLeftFirstImage = response['secondTestimonialLeftFirstImage']
    if 'secondTestimonialLeftSecondImage' in request.POST:
        check_db.secondTestimonialLeftSecondImage = response['secondTestimonialLeftSecondImage']
    if 'lastTestimonialFirstImage' in request.POST:
        check_db.lastTestimonialFirstImage = response['lastTestimonialFirstImage']
    if 'lastTestimonialSecondImage' in request.POST:
        check_db.lastTestimonialSecondImage = response['lastTestimonialSecondImage']
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Past Attandees Section Static Data -------------------#
@api_view(['POST'])
def add_home_pastAttandeesSectionStaticData(request):
    response = request.data
    check_db = pastAttandeesSection()

    if 'pastAttandeesSectionackgroundImage' in request.POST:
        check_db.pastAttandeesSectionackgroundImage = response['pastAttandeesSectionackgroundImage']
    if 'firstSectionLabel' in request.POST:
        check_db.firstSectionLabel = response['firstSectionLabel']
    if 'firstSectionBottomLabel' in request.POST:
        check_db.firstSectionBottomLabel = response['firstSectionBottomLabel']
    if 'firstSectionBottomIcon' in request.POST:
        check_db.firstSectionBottomIcon = response['firstSectionBottomIcon']
    if 'firstSectionBottomRedirectPath' in request.POST:
        check_db.firstSectionBottomRedirectPath = response['firstSectionBottomRedirectPath']
    if 'secondSectionLabel' in request.POST:
        check_db.secondSectionLabel = response['secondSectionLabel']
    if 'secondSectionBottomLabel' in request.POST:
        check_db.secondSectionBottomLabel = response['secondSectionBottomLabel']
    if 'secondSectionBottomIcon' in request.POST:
        check_db.secondSectionBottomIcon = response['secondSectionBottomIcon']
    if 'thirdSectionImage' in request.POST:
        check_db.thirdSectionImage = response['thirdSectionImage']
    if 'thirdSectionButtonLabel' in request.POST:
        check_db.thirdSectionButtonLabel = response['thirdSectionButtonLabel']
    if 'thirdSectionButtonRedirectPath' in request.POST:
        check_db.thirdSectionButtonRedirectPath = response['thirdSectionButtonRedirectPath']
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Past Attandee-------------------#
@api_view(['POST'])
def add_pastAttandee(request):
    response = request.data
    check_db = eventPastAttandees()

    if 'pastAttandeeName' in request.POST:
        check_db.pastAttandeeName = response['pastAttandeeName']

    if 'pastAttandeeLogo' in request.POST:
        check_db.pastAttandeeLogo = response['pastAttandeeLogo']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Past Attandee-------------------#
@api_view(['POST'])
def edit_pastAttandee(request):
    response = request.data
    check_db = eventPastAttandees.objects.get(id=response['id'])

    if 'pastAttandeeName' in request.POST:
        check_db.pastAttandeeName = response['pastAttandeeName']

    if 'pastAttandeeLogo' in request.POST:
        check_db.pastAttandeeLogo = response['pastAttandeeLogo']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Past Attandee -------------------#
@api_view(['POST'])
def delete_pastAttandee(request):
    response = request.data
    check_db = eventPastAttandees.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Event Expert Speakers ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventExpertSpeakersFun(request):
    eventExpertSpeakers_Data = eventExpertSpeakers.objects.all().filter(isDelete='No')
    eventExpertSpeakersOptions = []
    for expert in eventExpertSpeakers_Data:
        x={
            'id':expert.id,
            'expertSpeakerName':expert.expertSpeakerName,
            'expertSpeakerCompany':expert.expertSpeakerCompany,
            'created_at': expert.created_at,
            'updated_at': expert.updated_at,
            'created_by': expert.created_by,
            'updated_by': expert.updated_by,
        }
        eventExpertSpeakersOptions.append(x)
    return JsonResponse({'expertSpeakers': eventExpertSpeakersOptions, 'status': True})

#------------------- Api For Add Expert Speaker-------------------#
@api_view(['POST'])
def add_expertSpeaker(request):
    response = request.data
    check_db = eventExpertSpeakers()

    if 'expertSpeakerName' in request.POST:
        check_db.expertSpeakerName = response['expertSpeakerName']

    if 'expertSpeakerCompany' in request.POST:
        check_db.expertSpeakerCompany = response['expertSpeakerCompany']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Expert Speaker-------------------#
@api_view(['POST'])
def edit_expertSpeaker(request):
    response = request.data
    check_db = eventExpertSpeakers.objects.get(id=response['id'])

    if 'expertSpeakerName' in request.POST:
        check_db.expertSpeakerName = response['expertSpeakerName']

    if 'expertSpeakerCompany' in request.POST:
        check_db.expertSpeakerCompany = response['expertSpeakerCompany']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Expert Speaker -------------------#
@api_view(['POST'])
def delete_expertSpeaker(request):
    response = request.data
    check_db = eventExpertSpeakers.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Section Lable-------------------#
@api_view(['POST'])
def add_sponsorLable(request):
    response = request.data
    check_db = sponsorSection()

    if 'sponsorSectionLabel' in request.POST:
        check_db.sponsorSectionLabel = response['sponsorSectionLabel']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Footer First Section Options-------------------#
@api_view(['POST'])
def add_footerFirstSecOptions(request):
    response = request.data
    check_db = footerFirstSectionOptions()

    if 'optionName' in request.POST:
        check_db.optionName = response['optionName']

    if 'optionRedirectPath' in request.POST:
        check_db.optionRedirectPath = response['optionRedirectPath']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Footer Social Media Options ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def footerSocialMediaOptionsFun(request):
    socMedia_list = footerSocialMediaOptions.objects.all().filter(isDelete='No')
    dataSocialOptions = []
    for op in socMedia_list:
        x={
            'id':op.id,
            'facebookLink':op.facebookLink,
            'instagramLink':op.instagramLink,
            'twitterLink':op.twitterLink,
            'linkedinLink':op.linkedinLink,
            'emailLink':op.emailLink,
            'created_at': op.created_at,
            'updated_at': op.updated_at,
            'created_by': op.created_by,
            'updated_by': op.updated_by,
        }
        dataSocialOptions.append(x)
    return JsonResponse({'footerSocialMediaOptions': dataSocialOptions, 'status': True})

#------------------- Api For Add Footer Social Media Options-------------------#
@api_view(['POST'])
def add_footerSocialMediaOptions(request):
    response = request.data

    existing_data = footerSocialMediaOptions.objects.first()
    if existing_data:
        check_db = existing_data
    else:
        check_db = footerSocialMediaOptions()

    if 'facebookLink' in request.POST:
        check_db.facebookLink = response['facebookLink']

    if 'instagramLink' in request.POST:
        check_db.instagramLink = response['instagramLink']

    if 'twitterLink' in request.POST:
        check_db.twitterLink = response['twitterLink']
    
    if 'linkedinLink' in request.POST:
        check_db.linkedinLink = response['linkedinLink']

    if 'emailLink' in request.POST:
        check_db.emailLink = response['emailLink']

    if not existing_data:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Footer Social Media Options-------------------#
@api_view(['POST'])
def edit_footerSocialMediaOptions(request):
    response = request.data
    check_db = footerSocialMediaOptions.objects.get(id=response['id'])

    if 'facebookLink' in request.POST:
        check_db.facebookLink = response['facebookLink']

    if 'instagramLink' in request.POST:
        check_db.instagramLink = response['instagramLink']

    if 'twitterLink' in request.POST:
        check_db.twitterLink = response['twitterLink']
    
    if 'linkedinLink' in request.POST:
        check_db.linkedinLink = response['linkedinLink']

    if 'emailLink' in request.POST:
        check_db.emailLink = response['emailLink']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Footer Social Media Options -------------------#
@api_view(['POST'])
def delete_footerSocialMediaOptions(request):
    response = request.data
    check_db = footerSocialMediaOptions.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Home Page Companies-------------------#
@api_view(['POST'])
def add_homePageCompanies(request):
    response = request.data
    check_db = companiesLogoSection()

    if 'logoLink' in request.POST:
        check_db.logoLink = response['logoLink']

    if 'logoShowOrder' in request.POST:
        check_db.logoShowOrder = response['logoShowOrder']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Home Page Companies-------------------#
@api_view(['POST'])
def edit_homePageCompanies(request):
    response = request.data
    check_db = companiesLogoSection.objects.get(id=response['id'])

    if 'logoLink' in request.POST:
        check_db.logoLink = response['logoLink']

    if 'logoShowOrder' in request.POST:
        check_db.logoShowOrder = response['logoShowOrder']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Home Page Companies -------------------#
@api_view(['POST'])
def delete_homePageCompanies(request):
    response = request.data
    check_db = companiesLogoSection.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})


#------------------- Api For Add Speaker -------------------#
@api_view(['POST'])
def add_speaker(request):
    response = request.data
    check_db = eventSpeakers()

    if 'eventSpeakerName' in request.POST:
        check_db.eventSpeakerName = response['eventSpeakerName']
    if 'eventSpeakerCompany' in request.POST:
        check_db.eventSpeakerCompany = response['eventSpeakerCompany']
    if 'eventSpeakerShortDescription' in request.POST:
        check_db.eventSpeakerShortDescription = response['eventSpeakerShortDescription']
    if 'eventSpeakerDescription' in request.POST:
        check_db.eventSpeakerDescription = response['eventSpeakerDescription']
    if 'viewSpeakerButtonLabel' in request.POST:
        check_db.viewSpeakerButtonLabel = response['viewSpeakerButtonLabel']
    if 'speakerProfilePageLink' in request.POST:
        check_db.speakerProfilePageLink = response['speakerProfilePageLink']
    if 'eventSpeakerHomePageImage' in request.POST:
        check_db.eventSpeakerHomePageImage = response['eventSpeakerHomePageImage']
    if 'eventSpeakerProfilePageImage' in request.POST:
        check_db.eventSpeakerProfilePageImage = response['eventSpeakerProfilePageImage']
    if 'eventSpeakerFeaturedPageImage' in request.POST:
        check_db.eventSpeakerFeaturedPageImage = response['eventSpeakerFeaturedPageImage']
    if 'eventSpeakerEmail' in request.POST:
        check_db.eventSpeakerEmail = response['eventSpeakerEmail']
    if 'eventSpeakerProposedTitle' in request.POST:
        check_db.eventSpeakerProposedTitle = response['eventSpeakerProposedTitle']
    if 'isParticipated' in request.POST:
        check_db.isParticipated = response['isParticipated']
    if 'eventSpeakerProfilePageDescription' in request.POST:
        check_db.eventSpeakerProfilePageDescription = response['eventSpeakerProfilePageDescription']
    if 'eventSpeakerMetaTitle' in request.POST:
        check_db.eventSpeakerMetaTitle = response['eventSpeakerMetaTitle']
    if 'eventSpeakerMetaDescription' in request.POST:
        check_db.eventSpeakerMetaDescription = response['eventSpeakerMetaDescription']
    if 'eventSpeakerLinkedinFollowers' in request.POST:
        check_db.eventSpeakerLinkedinFollowers = response['eventSpeakerLinkedinFollowers']
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Speaker -------------------#
@api_view(['POST'])
def edit_speaker(request):
    response = request.data
    check_db = eventSpeakers.objects.get(id=response['id'])
    if 'eventSpeakerName' in request.POST:
        check_db.eventSpeakerName = response['eventSpeakerName']
    if 'eventSpeakerCompany' in request.POST:
        check_db.eventSpeakerCompany = response['eventSpeakerCompany']
    if 'eventSpeakerShortDescription' in request.POST:
        check_db.eventSpeakerShortDescription = response['eventSpeakerShortDescription']
    if 'eventSpeakerDescription' in request.POST:
        check_db.eventSpeakerDescription = response['eventSpeakerDescription']
    if 'viewSpeakerButtonLabel' in request.POST:
        check_db.viewSpeakerButtonLabel = response['viewSpeakerButtonLabel']
    if 'speakerProfilePageLink' in request.POST:
        check_db.speakerProfilePageLink = response['speakerProfilePageLink']
    if 'eventSpeakerHomePageImage' in request.POST:
        check_db.eventSpeakerHomePageImage = response['eventSpeakerHomePageImage']
    if 'eventSpeakerProfilePageImage' in request.POST:
        check_db.eventSpeakerProfilePageImage = response['eventSpeakerProfilePageImage']
    if 'eventSpeakerFeaturedPageImage' in request.POST:
        check_db.eventSpeakerFeaturedPageImage = response['eventSpeakerFeaturedPageImage']
    if 'eventSpeakerEmail' in request.POST:
        check_db.eventSpeakerEmail = response['eventSpeakerEmail']
    if 'eventSpeakerProposedTitle' in request.POST:
        check_db.eventSpeakerProposedTitle = response['eventSpeakerProposedTitle']
    if 'isParticipated' in request.POST:
        check_db.isParticipated = response['isParticipated']
    if 'eventSpeakerProfilePageDescription' in request.POST:
        check_db.eventSpeakerProfilePageDescription = response['eventSpeakerProfilePageDescription']
    if 'eventSpeakerMetaTitle' in request.POST:
        check_db.eventSpeakerMetaTitle = response['eventSpeakerMetaTitle']
    if 'eventSpeakerMetaDescription' in request.POST:
        check_db.eventSpeakerMetaDescription = response['eventSpeakerMetaDescription']
    if 'eventSpeakerLinkedinFollowers' in request.POST:
        check_db.eventSpeakerLinkedinFollowers = response['eventSpeakerLinkedinFollowers']
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Speaker -------------------#
@api_view(['POST'])
def delete_speaker(request):
    response = request.data
    check_db = eventSpeakers.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Testimonials-------------------#
@api_view(['POST'])
def add_testimonial(request):
    response = request.data
    check_db = eventTestimonials()

    if 'personName' in request.POST:
        check_db.personName = response['personName']

    if 'personCompany' in request.POST:
        check_db.personCompany = response['personCompany']

    if 'personMessage' in request.POST:
        check_db.personMessage = response['personMessage']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Testimonials-------------------#
@api_view(['POST'])
def edit_testimonial(request):
    response = request.data
    check_db = eventTestimonials.objects.get(id=response['id'])

    if 'personName' in request.POST:
        check_db.personName = response['personName']

    if 'personCompany' in request.POST:
        check_db.personCompany = response['personCompany']

    if 'personMessage' in request.POST:
        check_db.personMessage = response['personMessage']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor -------------------#
@api_view(['POST'])
def delete_testimonial(request):
    response = request.data
    check_db = eventTestimonials.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor -------------------#
@api_view(['POST'])
def add_sponsor(request):
    response = request.data
    check_db = eventSponsors()

    if 'sponsorComapnyName' in request.POST:
        check_db.sponsorComapnyName = response['sponsorComapnyName']
    if 'sponsorComapnyLogo' in request.POST:
        check_db.sponsorComapnyLogo = response['sponsorComapnyLogo']
    if 'sponsorType' in request.POST:
        check_db.sponsorType = response['sponsorType']
    if 'sponsorComapnyBioDescription' in request.POST:
        check_db.sponsorComapnyBioDescription = response['sponsorComapnyBioDescription']
    if 'sponsorWebsite' in request.POST:
        check_db.sponsorWebsite = response['sponsorWebsite']
    if 'sponsorComapnyBioLogo' in request.POST:
        check_db.sponsorComapnyBioLogo = response['sponsorComapnyBioLogo']
    if 'sponsorEmail' in request.POST:
        check_db.sponsorEmail = response['sponsorEmail']
    if 'sponsorMobile' in request.POST:
        check_db.sponsorMobile = response['sponsorMobile']
    if 'relateComapnyPersonName' in request.POST:
        check_db.relateComapnyPersonName = response['relateComapnyPersonName']
    if 'eventSponsorMetaTitle' in request.POST:
        check_db.eventSponsorMetaTitle = response['eventSponsorMetaTitle']
    if 'eventSponsorMetaDescription' in request.POST:
        check_db.eventSponsorMetaDescription = response['eventSponsorMetaDescription']
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor -------------------#
@api_view(['POST'])
def edit_sponsor(request):
    response = request.data
    check_db = eventSponsors.objects.get(id=response['id'])
    if 'sponsorComapnyName' in request.POST:
        check_db.sponsorComapnyName = response['sponsorComapnyName']
    if 'sponsorComapnyLogo' in request.POST:
        check_db.sponsorComapnyLogo = response['sponsorComapnyLogo']
    if 'sponsorType' in request.POST:
        check_db.sponsorType = response['sponsorType']
    if 'sponsorComapnyBioDescription' in request.POST:
        check_db.sponsorComapnyBioDescription = response['sponsorComapnyBioDescription']
    if 'sponsorWebsite' in request.POST:
        check_db.sponsorWebsite = response['sponsorWebsite']
    if 'sponsorComapnyBioLogo' in request.POST:
        check_db.sponsorComapnyBioLogo = response['sponsorComapnyBioLogo']
    if 'sponsorEmail' in request.POST:
        check_db.sponsorEmail = response['sponsorEmail']
    if 'sponsorMobile' in request.POST:
        check_db.sponsorMobile = response['sponsorMobile']
    if 'relateComapnyPersonName' in request.POST:
        check_db.relateComapnyPersonName = response['relateComapnyPersonName']
    if 'eventSponsorMetaTitle' in request.POST:
        check_db.eventSponsorMetaTitle = response['eventSponsorMetaTitle']
    if 'eventSponsorMetaDescription' in request.POST:
        check_db.eventSponsorMetaDescription = response['eventSponsorMetaDescription']
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor -------------------#
@api_view(['POST'])
def delete_sponsor(request):
    response = request.data
    check_db = eventSponsors.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Industry Trends-------------------#
@api_view(['POST'])
def add_industryTrend(request):
    response = request.data
    check_db = eventIndustryTrends()

    if 'trendTitle' in request.POST:
        check_db.trendTitle = response['trendTitle']

    if 'trendRedirectPath' in request.POST:
        check_db.trendRedirectPath = response['trendRedirectPath']

    if 'trendShortDescription' in request.POST:
        check_db.trendShortDescription = response['trendShortDescription']

    if 'trendLongDescription' in request.POST:
        check_db.trendLongDescription = response['trendLongDescription']

    if 'trendMetaTitle' in request.POST:
        check_db.trendMetaTitle = response['trendMetaTitle']

    if 'trendMetaDescription' in request.POST:
        check_db.trendMetaDescription = response['trendMetaDescription']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Industry Trends-------------------#
@api_view(['POST'])
def edit_industryTrend(request):
    response = request.data
    check_db = eventIndustryTrends.objects.get(id=response['id'])

    if 'trendTitle' in request.POST:
        check_db.trendTitle = response['trendTitle']

    if 'trendRedirectPath' in request.POST:
        check_db.trendRedirectPath = response['trendRedirectPath']

    if 'trendShortDescription' in request.POST:
        check_db.trendShortDescription = response['trendShortDescription']

    if 'trendLongDescription' in request.POST:
        check_db.trendLongDescription = response['trendLongDescription']

    if 'trendMetaTitle' in request.POST:
        check_db.trendMetaTitle = response['trendMetaTitle']

    if 'trendMetaDescription' in request.POST:
        check_db.trendMetaDescription = response['trendMetaDescription']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Industry Trend -------------------#
@api_view(['POST'])
def delete_industryTrend(request):
    response = request.data
    check_db = eventIndustryTrends.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Related Event-------------------#
@api_view(['POST'])
def add_relatedEvent(request):
    response = request.data
    check_db = relatedEvents()

    if 'eventName' in request.POST:
        check_db.eventName = response['eventName']

    if 'eventLocation' in request.POST:
        check_db.eventLocation = response['eventLocation']

    if 'eventWebsiteLink' in request.POST:
        check_db.eventWebsiteLink = response['eventWebsiteLink']

    if 'eventDate' in request.POST:
        check_db.eventDate = response['eventDate']

    if 'eventImage' in request.POST:
        check_db.eventImage = response['eventImage']

    if 'eventHoverImage' in request.POST:
        check_db.eventHoverImage = response['eventHoverImage']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Related Event-------------------#
@api_view(['POST'])
def edit_relatedEvent(request):
    response = request.data
    check_db = relatedEvents.objects.get(id=response['id'])

    if 'eventName' in request.POST:
        check_db.eventName = response['eventName']

    if 'eventLocation' in request.POST:
        check_db.eventLocation = response['eventLocation']

    if 'eventWebsiteLink' in request.POST:
        check_db.eventWebsiteLink = response['eventWebsiteLink']

    if 'eventDate' in request.POST:
        check_db.eventDate = response['eventDate']

    if 'eventImage' in request.POST:
        check_db.eventImage = response['eventImage']

    if 'eventHoverImage' in request.POST:
        check_db.eventHoverImage = response['eventHoverImage']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Related Event-------------------#
@api_view(['POST'])
def delete_relatedEvent(request):
    response = request.data
    check_db = relatedEvents.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Register Page Static Data-------------------#
@api_view(['POST'])
def add_regPageStaticData(request):
    response = request.data
    check_db = registerPageSettings()

    if 'sectionFirstTitle' in request.POST:
        check_db.sectionFirstTitle = response['sectionFirstTitle']

    if 'sectionFirstPackageTitle' in request.POST:
        check_db.sectionFirstPackageTitle = response['sectionFirstPackageTitle']

    if 'sectionFirstPackageDescription' in request.POST:
        check_db.sectionFirstPackageDescription = response['sectionFirstPackageDescription']

    if 'groupPassSectionTilte' in request.POST:
        check_db.groupPassSectionTilte = response['groupPassSectionTilte']

    if 'groupPassSectionButtonTitle' in request.POST:
        check_db.groupPassSectionButtonTitle = response['groupPassSectionButtonTitle']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Delegate Package-------------------#
@api_view(['POST'])
def add_delegatePackage(request):
    response = request.data
    check_db = eventDeligatePackages()

    if 'deligatePackageName' in request.POST:
        check_db.deligatePackageName = response['deligatePackageName']

    if 'deligatePackagePrice' in request.POST:
        check_db.deligatePackagePrice = response['deligatePackagePrice']

    if 'deligatePackageStatus' in request.POST:
        check_db.deligatePackageStatus = response['deligatePackageStatus']

    if 'deligatePackageShowOrder' in request.POST:
        check_db.deligatePackageShowOrder = response['deligatePackageShowOrder']

    if 'deligatePackageExpiryDate' in request.POST:
        check_db.deligatePackageExpiryDate = response['deligatePackageExpiryDate']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Delegate Package-------------------#
@api_view(['POST'])
def edit_delegatePackage(request):
    response = request.data
    check_db = eventDeligatePackages.objects.get(id=response['id'])

    if 'deligatePackageName' in request.POST:
        check_db.deligatePackageName = response['deligatePackageName']

    if 'deligatePackagePrice' in request.POST:
        check_db.deligatePackagePrice = response['deligatePackagePrice']

    if 'deligatePackageStatus' in request.POST:
        check_db.deligatePackageStatus = response['deligatePackageStatus']

    if 'deligatePackageShowOrder' in request.POST:
        check_db.deligatePackageShowOrder = response['deligatePackageShowOrder']

    if 'deligatePackageExpiryDate' in request.POST:
        check_db.deligatePackageExpiryDate = response['deligatePackageExpiryDate']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Delegate Package-------------------#
@api_view(['POST'])
def delete_delegatePackage(request):
    response = request.data
    check_db = eventDeligatePackages.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Group Pass Request-------------------#
@api_view(['POST'])
def add_groupPassRequest(request):
    response = request.data
    check_db = groupPassRegistrationRequestData()

    if 'requesterName' in request.POST:
        check_db.requesterName = response['requesterName']

    if 'requesterCompanyName' in request.POST:
        check_db.requesterCompanyName = response['requesterCompanyName']

    if 'requesterEmail' in request.POST:
        check_db.requesterEmail = response['requesterEmail']

    if 'requesterMobile' in request.POST:
        check_db.requesterMobile = response['requesterMobile']

    if 'requesterInterest' in request.POST:
        check_db.requesterInterest = response['requesterInterest']

    if 'noOfAttandees' in request.POST:
        check_db.noOfAttandees = response['noOfAttandees']

    if 'requesterMessage' in request.POST:
        check_db.requesterMessage = response['requesterMessage']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Delegate Package Inclusion-------------------#
@api_view(['POST'])
def add_delegatePackageInclusion(request):
    response = request.data
    check_db = deligatePackageInclusionPoints()

    if 'inclusionPointIcon' in request.POST:
        check_db.inclusionPointIcon = response['inclusionPointIcon']

    if 'inclusionPointDescription' in request.POST:
        check_db.inclusionPointDescription = response['inclusionPointDescription']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Delegate Package Add Ons-------------------#
@api_view(['POST'])
def add_delegatePackageAddOns(request):
    response = request.data
    check_db = delegatesAddOns()

    if 'addOnPointName' in request.POST:
        check_db.addOnPointName = response['addOnPointName']

    if 'additionalPrice' in request.POST:
        check_db.additionalPrice = response['additionalPrice']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Delegate Package Add Ons-------------------#
@api_view(['POST'])
def edit_delegatePackageAddOns(request):
    response = request.data
    check_db = delegatesAddOns.objects.get(id=response['id'])

    if 'addOnPointName' in request.POST:
        check_db.addOnPointName = response['addOnPointName']

    if 'additionalPrice' in request.POST:
        check_db.additionalPrice = response['additionalPrice']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Delegate Package Add Ons-------------------#
@api_view(['POST'])
def delete_delegatePackageAddOns(request):
    response = request.data
    check_db = delegatesAddOns.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Payment Option Image-------------------#
@api_view(['POST'])
def add_paymentOptionImg(request):
    response = request.data
    check_db = paymentOptionImage()

    if 'paymentOptionImageLink' in request.POST:
        check_db.paymentOptionImageLink = response['paymentOptionImageLink']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Offer Coupon-------------------#
@api_view(['POST'])
def add_offerCoupon(request):
    response = request.data
    check_db = offerCoupon()

    if 'couponCode' in request.POST:
        check_db.couponCode = response['couponCode']

    if 'discountType' in request.POST:
        check_db.discountType = response['discountType']

    if 'discountAmount' in request.POST:
        check_db.discountAmount = response['discountAmount']

    if 'couponFor' in request.POST:
        check_db.couponFor = response['couponFor']

    if 'eventSpecialWord' in request.POST:
        check_db.eventSpecialWord = response['eventSpecialWord']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Offer Coupon-------------------#
@api_view(['POST'])
def edit_offerCoupon(request):
    response = request.data
    check_db = offerCoupon.objects.get(id=response['id'])

    if 'couponCode' in request.POST:
        check_db.couponCode = response['couponCode']

    if 'discountType' in request.POST:
        check_db.discountType = response['discountType']

    if 'discountAmount' in request.POST:
        check_db.discountAmount = response['discountAmount']

    if 'couponFor' in request.POST:
        check_db.couponFor = response['couponFor']

    if 'eventSpecialWord' in request.POST:
        check_db.eventSpecialWord = response['eventSpecialWord']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Offer Coupon-------------------#
@api_view(['POST'])
def delete_offerCoupon(request):
    response = request.data
    check_db = offerCoupon.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Agenda Item-------------------#
# @api_view(['POST'])
# def delete_agenda(request):
#     response = request.data
#     check_db = offerCoupon.objects.get(id=response['id'])
#     check_db.isDelete = response['isDelete']
#     check_db.save()
#     return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Agenda-------------------#
# @api_view(['POST'])
# def edit_agenda(request):
#     response = request.data
#     check_db = eventAgenda.objects.get(id=response['id'])

#     if 'status' in request.POST:
#         check_db.status = response['status']

#     if 'heading' in request.POST:
#         check_db.heading = response['heading']

#     if 'day' in request.POST:
#         check_db.day = response['day']

#     if 'startTime' in request.POST:
#         check_db.startTime = response['startTime']

#     if 'endTime' in request.POST:
#         check_db.endTime = response['endTime']

#     if 'sponsorBy' in request.POST:
#         check_db.sponsorBy = response['sponsorBy']

#     if 'sortOrder' in request.POST:
#         check_db.sortOrder = response['sortOrder']

#     if 'speakerFormat' in request.POST:
#         check_db.speakerFormat = response['speakerFormat']

#     if 'bulletPoints' in request.POST:
#         check_db.bulletPoints = response['bulletPoints']

#     if 'industryTrends' in request.POST:
#         check_db.industryTrends = response['industryTrends']
    
#     if 'speaker1Bullets' in request.POST:
#         check_db.speaker1Bullets = response['speaker1Bullets']
#     if 'speaker2Bullets' in request.POST:
#         check_db.speaker2Bullets = response['speaker2Bullets']
#     if 'panelSpeakerImages' in request.POST:
#         check_db.panelSpeakerImages = response['panelSpeakerImages']
#     if 'panelSpeakerIds' in request.POST:
#         check_db.panelSpeakerIds = response['panelSpeakerIds']
#     if 'panelModerators' in request.POST:
#         check_db.panelModerators = response['panelModerators']
#     if 'selectedSpeakers' in request.POST:
#         check_db.selectedSpeakers = response['selectedSpeakers']
#     if 'singleSpeakerAgendaImg' in request.POST:
#         check_db.singleSpeakerAgendaImg = response['singleSpeakerAgendaImg']
#     if 'singleSpeakerCompanyImg' in request.POST:
#         check_db.singleSpeakerCompanyImg = response['singleSpeakerCompanyImg']
#     if 'singleSpeakerId' in request.POST:
#         check_db.singleSpeakerId = response['singleSpeakerId']
#     if 'Speaker1AgendaImg' in request.POST:
#         check_db.Speaker1AgendaImg = response['Speaker1AgendaImg']
#     if 'Speaker1CompanyImg' in request.POST:
#         check_db.Speaker1CompanyImg = response['Speaker1CompanyImg']
#     if 'Speaker1Id' in request.POST:
#         check_db.Speaker1Id = response['Speaker1Id']
#     if 'Speaker2AgendaImg' in request.POST:
#         check_db.Speaker2AgendaImg = response['Speaker2AgendaImg']
#     if 'Speaker2CompanyImg' in request.POST:
#         check_db.Speaker2CompanyImg = response['Speaker2CompanyImg']
#     if 'Speaker2Id' in request.POST:
#         check_db.Speaker2Id = response['Speaker2Id']

#     check_db.updated_by = "Admin"
#     check_db.save()

#     return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Agenda-------------------#
# @api_view(['POST'])
# def add_agenda(request):
#     response = request.data
#     check_db = eventAgenda()

#     if 'status' in request.POST:
#         check_db.status = response['status']

#     if 'heading' in request.POST:
#         check_db.heading = response['heading']

#     if 'day' in request.POST:
#         check_db.day = response['day']

#     if 'startTime' in request.POST:
#         check_db.startTime = response['startTime']

#     if 'endTime' in request.POST:
#         check_db.endTime = response['endTime']

#     if 'sponsorBy' in request.POST:
#         check_db.sponsorBy = response['sponsorBy']

#     if 'sortOrder' in request.POST:
#         check_db.sortOrder = response['sortOrder']

#     if 'speakerFormat' in request.POST:
#         check_db.speakerFormat = response['speakerFormat']

#     if 'bulletPoints' in request.POST:
#         check_db.bulletPoints = response['bulletPoints']

#     if 'industryTrends' in request.POST:
#         check_db.industryTrends = response['industryTrends']
    
#     if 'speaker1Bullets' in request.POST:
#         check_db.speaker1Bullets = response['speaker1Bullets']
#     if 'speaker2Bullets' in request.POST:
#         check_db.speaker2Bullets = response['speaker2Bullets']
#     if 'panelSpeakerImages' in request.POST:
#         check_db.panelSpeakerImages = response['panelSpeakerImages']
#     if 'panelSpeakerIds' in request.POST:
#         check_db.panelSpeakerIds = response['panelSpeakerIds']
#     if 'panelModerators' in request.POST:
#         check_db.panelModerators = response['panelModerators']
#     if 'selectedSpeakers' in request.POST:
#         check_db.selectedSpeakers = response['selectedSpeakers']
#     if 'singleSpeakerAgendaImg' in request.POST:
#         check_db.singleSpeakerAgendaImg = response['singleSpeakerAgendaImg']
#     if 'singleSpeakerCompanyImg' in request.POST:
#         check_db.singleSpeakerCompanyImg = response['singleSpeakerCompanyImg']
#     if 'singleSpeakerId' in request.POST:
#         check_db.singleSpeakerId = response['singleSpeakerId']
#     if 'Speaker1AgendaImg' in request.POST:
#         check_db.Speaker1AgendaImg = response['Speaker1AgendaImg']
#     if 'Speaker1CompanyImg' in request.POST:
#         check_db.Speaker1CompanyImg = response['Speaker1CompanyImg']
#     if 'Speaker1Id' in request.POST:
#         check_db.Speaker1Id = response['Speaker1Id']
#     if 'Speaker2AgendaImg' in request.POST:
#         check_db.Speaker2AgendaImg = response['Speaker2AgendaImg']
#     if 'Speaker2CompanyImg' in request.POST:
#         check_db.Speaker2CompanyImg = response['Speaker2CompanyImg']
#     if 'Speaker2Id' in request.POST:
#         check_db.Speaker2Id = response['Speaker2Id']

#     check_db.created_by = "Admin"
#     check_db.updated_by = "Admin"
#     check_db.save()

#     return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Who Should Attend Page Staic Data -------------------#
@api_view(['POST'])
def add_whoAttendPageStaticData(request):
    response = request.data
    # Check if any entry exists in the model
    existing_entry = whoShouldAttendPageData.objects.first()

    if existing_entry:
        # Update the existing entry
        check_db = existing_entry
    else:
        # Create a new entry
        check_db = whoShouldAttendPageData()

    if 'sectionFirstTitle' in request.POST:
        check_db.sectionFirstTitle = response['sectionFirstTitle']
    if 'sectionFirstBoldDescription' in request.POST:
        check_db.sectionFirstBoldDescription = response['sectionFirstBoldDescription']
    if 'sectionFirstPoints' in request.POST:
        check_db.sectionFirstPoints = response['sectionFirstPoints']
    if 'sectionFirstButtonLabel' in request.POST:
        check_db.sectionFirstButtonLabel = response['sectionFirstButtonLabel']
    if 'sectionFirstButtonRedirectPath' in request.POST:
        check_db.sectionFirstButtonRedirectPath = response['sectionFirstButtonRedirectPath']
    if 'sectionFirstLeftImage' in request.POST:
        check_db.sectionFirstLeftImage = response['sectionFirstLeftImage']
    if 'sectionSecondTitle' in request.POST:
        check_db.sectionSecondTitle = response['sectionSecondTitle']
    if 'sectionSecondPoints' in request.POST:
        check_db.sectionSecondPoints = response['sectionSecondPoints']
    if 'sectionSecondButtonRedirectPath' in request.POST:
        check_db.sectionSecondButtonRedirectPath = response['sectionSecondButtonRedirectPath']
    if 'sectionSecondRightImage' in request.POST:
        check_db.sectionSecondRightImage = response['sectionSecondRightImage']
    if 'sectionThreeTilte' in request.POST:
        check_db.sectionThreeTilte = response['sectionThreeTilte']
    if 'sectionThreeDescription' in request.POST:
        check_db.sectionThreeDescription = response['sectionThreeDescription']
    if 'sectionThreeTabOneTitle' in request.POST:
        check_db.sectionThreeTabOneTitle = response['sectionThreeTabOneTitle']
    if 'sectionThreeTabOneDescription' in request.POST:
        check_db.sectionThreeTabOneDescription = response['sectionThreeTabOneDescription']
    if 'sectionThreeTabTwoTitle' in request.POST:
        check_db.sectionThreeTabTwoTitle = response['sectionThreeTabTwoTitle']
    if 'sectionThreeTabTwoDescription' in request.POST:
        check_db.sectionThreeTabTwoDescription = response['sectionThreeTabTwoDescription']
    if 'sectionFourTilte' in request.POST:
        check_db.sectionFourTilte = response['sectionFourTilte']
    # Set metadata
    if not existing_entry:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Event Core Attandee-------------------#
@api_view(['POST'])
def add_eventCoreAttandee(request):
    response = request.data
    check_db = eventCoreAttandees()

    if 'corAttandeeName' in request.POST:
        check_db.corAttandeeName = response['corAttandeeName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Event Core Attandee-------------------#
@api_view(['POST'])
def edit_eventCoreAttandee(request):
    response = request.data
    check_db = eventCoreAttandees.objects.get(id=response['id'])

    if 'corAttandeeName' in request.POST:
        check_db.corAttandeeName = response['corAttandeeName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Event Core Attandee-------------------#
@api_view(['POST'])
def delete_eventCoreAttandee(request):
    response = request.data
    check_db = eventCoreAttandees.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Event Participated Industries-------------------#
@api_view(['POST'])
def add_eventParticipatedIndustry(request):
    response = request.data
    check_db = eventParticipatedIndustries()

    if 'industryName' in request.POST:
        check_db.industryName = response['industryName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Event Participated Industries-------------------#
@api_view(['POST'])
def edit_eventParticipatedIndustry(request):
    response = request.data
    check_db = eventParticipatedIndustries.objects.get(id=response['id'])

    if 'industryName' in request.POST:
        check_db.industryName = response['industryName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Event Participated Industries-------------------#
@api_view(['POST'])
def delete_eventParticipatedIndustry(request):
    response = request.data
    check_db = eventParticipatedIndustries.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Speaker Page Static Data-------------------#
@api_view(['POST'])
def add_speakerPageStaticData(request):
    response = request.data
    existing_entry = speakerPageData.objects.first()

    if existing_entry:
        # Update the existing entry
        check_db = existing_entry
    else:
        check_db = speakerPageData()

    if 'sectionFirstTitle' in request.POST:
        check_db.sectionFirstTitle = response['sectionFirstTitle']

    if 'sectionFirstDescription' in request.POST:
        check_db.sectionFirstDescription = response['sectionFirstDescription']

    if 'sectionFirstButtonLabel' in request.POST:
        check_db.sectionFirstButtonLabel = response['sectionFirstButtonLabel']

    if 'sectionFirstButtonRedirectPath' in request.POST:
        check_db.sectionFirstButtonRedirectPath = response['sectionFirstButtonRedirectPath']

    if 'sectionFirstLeftImage' in request.POST:
        check_db.sectionFirstLeftImage = response['sectionFirstLeftImage']

    if 'sectionSecondTitle' in request.POST:
        check_db.sectionSecondTitle = response['sectionSecondTitle']

    if 'sectionSecondDescription' in request.POST:
        check_db.sectionSecondDescription = response['sectionSecondDescription']

    if 'sectionSecondButtonLabel' in request.POST:
        check_db.sectionSecondButtonLabel = response['sectionSecondButtonLabel']

    if 'sectionSecondButtonRedirectPath' in request.POST:
        check_db.sectionSecondButtonRedirectPath = response['sectionSecondButtonRedirectPath']

    if 'sectionSecondRightImage' in request.POST:
        check_db.sectionSecondRightImage = response['sectionSecondRightImage']

    if not existing_entry:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Speaker Page Section Three Points-------------------#
@api_view(['POST'])
def add_speakerPageSecThirdPoints(request):
    response = request.data
    check_db = speakerPageSectionThreePoints()

    if 'pointTitle' in request.POST:
        check_db.pointTitle = response['pointTitle']

    if 'pointDescription' in request.POST:
        check_db.pointDescription = response['pointDescription']

    if 'pointIcon' in request.POST:
        check_db.pointIcon = response['pointIcon']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Page Static Data-------------------#
@api_view(['POST'])
def add_sponsorPageStaticData(request):
    response = request.data
    existing_entry = sponsorPageData.objects.first()
    if existing_entry:
        # Update the existing entry
        check_db = existing_entry
    else:
        check_db = sponsorPageData()

    if 'introParaHeading' in request.POST:
        check_db.introParaHeading = response['introParaHeading']

    if 'introParaDescription' in request.POST:
        check_db.introParaDescription = response['introParaDescription']

    if 'introParaButtonLabel' in request.POST:
        check_db.introParaButtonLabel = response['introParaButtonLabel']

    if 'introParaButtonRedirectPath' in request.POST:
        check_db.introParaButtonRedirectPath = response['introParaButtonRedirectPath']

    if 'introParaImage' in request.POST:
        check_db.introParaImage = response['introParaImage']

    if 'exhibitSectionTitle' in request.POST:
        check_db.exhibitSectionTitle = response['exhibitSectionTitle']

    if 'exhibitSectionFirstBoxTitle' in request.POST:
        check_db.exhibitSectionFirstBoxTitle = response['exhibitSectionFirstBoxTitle']

    if 'exhibitSectionFirstBoxShortDescription' in request.POST:
        check_db.exhibitSectionFirstBoxShortDescription = response['exhibitSectionFirstBoxShortDescription']

    if 'exhibitSectionFirstBoxPoints' in request.POST:
        check_db.exhibitSectionFirstBoxPoints = response['exhibitSectionFirstBoxPoints']

    if 'exhibitSectionSecondBoxTitle' in request.POST:
        check_db.exhibitSectionSecondBoxTitle = response['exhibitSectionSecondBoxTitle']

    if 'exhibitSectionSecondBoxShortDescription' in request.POST:
        check_db.exhibitSectionSecondBoxShortDescription = response['exhibitSectionSecondBoxShortDescription']

    if 'exhibitSectionSecondBoxPoints' in request.POST:
        check_db.exhibitSectionSecondBoxPoints = response['exhibitSectionSecondBoxPoints']

    if 'exhibitSectionThirdBoxTitle' in request.POST:
        check_db.exhibitSectionThirdBoxTitle = response['exhibitSectionThirdBoxTitle']

    if 'exhibitSectionThirdBoxShortDescription' in request.POST:
        check_db.exhibitSectionThirdBoxShortDescription = response['exhibitSectionThirdBoxShortDescription']

    if 'exhibitSectionThirdBoxPoints' in request.POST:
        check_db.exhibitSectionThirdBoxPoints = response['exhibitSectionThirdBoxPoints']

    if not existing_entry:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor Page Static Data-------------------#
@api_view(['POST'])
def edit_sponsorPageStaticData(request):
    response = request.data
    check_db = sponsorPageData.objects.get(id=response['id'])

    if 'introParaHeading' in request.POST:
        check_db.introParaHeading = response['introParaHeading']

    if 'introParaDescription' in request.POST:
        check_db.introParaDescription = response['introParaDescription']

    if 'introParaButtonLabel' in request.POST:
        check_db.introParaButtonLabel = response['introParaButtonLabel']

    if 'introParaButtonRedirectPath' in request.POST:
        check_db.introParaButtonRedirectPath = response['introParaButtonRedirectPath']

    if 'introParaImage' in request.POST:
        check_db.introParaImage = response['introParaImage']

    if 'exhibitSectionTitle' in request.POST:
        check_db.exhibitSectionTitle = response['exhibitSectionTitle']

    if 'exhibitSectionFirstBoxTitle' in request.POST:
        check_db.exhibitSectionFirstBoxTitle = response['exhibitSectionFirstBoxTitle']

    if 'exhibitSectionFirstBoxShortDescription' in request.POST:
        check_db.exhibitSectionFirstBoxShortDescription = response['exhibitSectionFirstBoxShortDescription']

    if 'exhibitSectionFirstBoxPoints' in request.POST:
        check_db.exhibitSectionFirstBoxPoints = response['exhibitSectionFirstBoxPoints']

    if 'exhibitSectionSecondBoxTitle' in request.POST:
        check_db.exhibitSectionSecondBoxTitle = response['exhibitSectionSecondBoxTitle']

    if 'exhibitSectionSecondBoxShortDescription' in request.POST:
        check_db.exhibitSectionSecondBoxShortDescription = response['exhibitSectionSecondBoxShortDescription']

    if 'exhibitSectionSecondBoxPoints' in request.POST:
        check_db.exhibitSectionSecondBoxPoints = response['exhibitSectionSecondBoxPoints']

    if 'exhibitSectionThirdBoxTitle' in request.POST:
        check_db.exhibitSectionThirdBoxTitle = response['exhibitSectionThirdBoxTitle']

    if 'exhibitSectionThirdBoxShortDescription' in request.POST:
        check_db.exhibitSectionThirdBoxShortDescription = response['exhibitSectionThirdBoxShortDescription']

    if 'exhibitSectionThirdBoxPoints' in request.POST:
        check_db.exhibitSectionThirdBoxPoints = response['exhibitSectionThirdBoxPoints']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor Page Static Data-------------------#
@api_view(['POST'])
def delete_sponsorPageStaticData(request):
    response = request.data
    check_db = sponsorPageData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Page Bullet Points-------------------#
@api_view(['POST'])
def add_sponsorPageBulletPoints(request):
    response = request.data
    check_db = sponsorPageBulletData()

    if 'pointIcon' in request.POST:
        check_db.pointIcon = response['pointIcon']

    if 'pointShortDescription' in request.POST:
        check_db.pointShortDescription = response['pointShortDescription']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Venue Page Static Data-------------------#
@api_view(['POST'])
def add_venuePageStaticData(request):
    response = request.data
    existing_entry = venuePageData.objects.first()
    if existing_entry:
        check_db = existing_entry
    else:
        check_db = venuePageData()

    existing_gallery = venuePageGallery.objects.first()
    if existing_gallery:
        check_db_1 = existing_gallery
    else:
        check_db_1 = venuePageGallery()

    # if 'venueFirstSectionFirstTitle' in request.POST:
    #     check_db.venueFirstSectionFirstTitle = response['venueFirstSectionFirstTitle']

    if 'venueFirstSectionDescription' in request.POST:
        check_db.venueFirstSectionDescription = response['venueFirstSectionDescription']

    if 'venueLocation' in request.POST:
        check_db.venueLocation = response['venueLocation']

    if 'venueContact' in request.POST:
        check_db.venueContact = response['venueContact']

    if 'venueAddressLink' in request.POST:
        check_db.venueAddressLink = response['venueAddressLink']

    if 'venueMapLink' in request.POST:
        check_db.venueMapLink = response['venueMapLink']

    # if 'venueWebsiteAddress' in request.POST:
    #     check_db.venueWebsiteAddress = response['venueWebsiteAddress']

    if 'gallerySectionOneBigImage' in request.POST:
        check_db_1.gallerySectionOneBigImage = response['gallerySectionOneBigImage']

    if 'gallerySectionOneSmallImage' in request.POST:
        check_db_1.gallerySectionOneSmallImage = response['gallerySectionOneSmallImage']

    if 'gallerySectionTwoBigImage' in request.POST:
        check_db_1.gallerySectionTwoBigImage = response['gallerySectionTwoBigImage']

    if 'gallerySectionTwoSmallImage' in request.POST:
        check_db_1.gallerySectionTwoSmallImage = response['gallerySectionTwoSmallImage']

    if 'gallerySectionThreeBigImage' in request.POST:
        check_db_1.gallerySectionThreeBigImage = response['gallerySectionThreeBigImage']

    if 'gallerySectionThreeSmallImage' in request.POST:
        check_db_1.gallerySectionThreeSmallImage = response['gallerySectionThreeSmallImage']

    if not existing_entry:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()
    check_db_1.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Venue Page Gallery Images-------------------#
@api_view(['POST'])
def add_venuePageGalleryImages(request):
    response = request.data
    check_db = venuePageGallery()

    if 'gallerySectionOneBigImage' in request.POST:
        check_db.gallerySectionOneBigImage = response['gallerySectionOneBigImage']

    if 'gallerySectionOneSmallImage' in request.POST:
        check_db.gallerySectionOneSmallImage = response['gallerySectionOneSmallImage']

    if 'gallerySectionTwoBigImage' in request.POST:
        check_db.gallerySectionTwoBigImage = response['gallerySectionTwoBigImage']

    if 'gallerySectionTwoSmallImage' in request.POST:
        check_db.gallerySectionTwoSmallImage = response['gallerySectionTwoSmallImage']

    if 'gallerySectionThreeBigImage' in request.POST:
        check_db.gallerySectionThreeBigImage = response['gallerySectionThreeBigImage']

    if 'gallerySectionThreeSmallImage' in request.POST:
        check_db.gallerySectionThreeSmallImage = response['gallerySectionThreeSmallImage']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add News Category-------------------#
@api_view(['POST'])
def add_newsCategory(request):
    response = request.data
    check_db = newsCategory()

    if 'categoryName' in request.POST:
        check_db.categoryName = response['categoryName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit News Category-------------------#
@api_view(['POST'])
def edit_newsCategory(request):
    response = request.data
    check_db = newsCategory.objects.get(id=response['id'])

    if 'categoryName' in request.POST:
        check_db.categoryName = response['categoryName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete News Category-------------------#
@api_view(['POST'])
def delete_newsCategory(request):
    response = request.data
    check_db = newsCategory.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add General News  -------------------#
@api_view(['POST'])
def add_generalNews(request):
    response = request.data
    check_db = generalNewsPoint()

    if 'newsCategoryId' in request.POST:
        newsCategoryData = newsCategory.objects.get(id=response['newsCategoryId'])
        check_db.newsCategoryId = newsCategoryData

    if 'newsTitle' in request.POST:
        check_db.newsTitle = response['newsTitle']

    if 'newsShortDescription' in request.POST:
        check_db.newsShortDescription = response['newsShortDescription']

    if 'newsDescription' in request.POST:
        check_db.newsDescription = response['newsDescription']

    if 'newsImage' in request.POST:
        check_db.newsImage = response['newsImage']

    if 'newsCreatedDate' in request.POST:
        check_db.newsCreatedDate = response['newsCreatedDate']

    if 'isTopNews' in request.POST:
        check_db.isTopNews = response['isTopNews']

    if 'newsMetaTitle' in request.POST:
        check_db.newsMetaTitle = response['newsMetaTitle']
    
    if 'newsMetaDescription' in request.POST:
        check_db.newsMetaDescription = response['newsMetaDescription']

    if 'newsImageAltText' in request.POST:
        check_db.newsImageAltText = response['newsImageAltText']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit General News  -------------------#
@api_view(['POST'])
def edit_generalNews(request):
    response = request.data
    check_db = generalNewsPoint.objects.get(id=response['id'])

    if 'newsCategoryId' in request.POST:
        newsCategoryData = newsCategory.objects.get(id=response['newsCategoryId'])
        check_db.newsCategoryId = newsCategoryData

    if 'newsTitle' in request.POST:
        check_db.newsTitle = response['newsTitle']

    if 'newsShortDescription' in request.POST:
        check_db.newsShortDescription = response['newsShortDescription']

    if 'newsDescription' in request.POST:
        check_db.newsDescription = response['newsDescription']

    if 'newsImage' in request.POST:
        check_db.newsImage = response['newsImage']

    if 'newsCreatedDate' in request.POST:
        check_db.newsCreatedDate = response['newsCreatedDate']

    if 'isTopNews' in request.POST:
        check_db.isTopNews = response['isTopNews']

    if 'newsMetaTitle' in request.POST:
        check_db.newsMetaTitle = response['newsMetaTitle']
    
    if 'newsMetaDescription' in request.POST:
        check_db.newsMetaDescription = response['newsMetaDescription']

    if 'newsImageAltText' in request.POST:
        check_db.newsImageAltText = response['newsImageAltText']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})


#------------------- Api For Delete General News-------------------#
@api_view(['POST'])
def delete_generalNews(request):
    response = request.data
    check_db = generalNewsPoint.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Latest News  -------------------#
@api_view(['POST'])
def add_latestNews(request):
    response = request.data
    check_db = latestNews()

    if 'newsCategoryId' in request.POST:
        newsCategoryData = newsCategory.objects.get(id=response['newsCategoryId'])
        check_db.newsCategoryId = newsCategoryData

    if 'generalNewsPointId' in request.POST:
        generalNewsPointData = generalNewsPoint.objects.get(id=response['generalNewsPointId'])
        check_db.generalNewsPointId = generalNewsPointData


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Top News  -------------------#
@api_view(['POST'])
def add_topNews(request):
    response = request.data
    check_db = topNews()

    if 'newsCategoryId' in request.POST:
        newsCategoryData = newsCategory.objects.get(id=response['newsCategoryId'])
        check_db.newsCategoryId = newsCategoryData

    if 'generalNewsPointId' in request.POST:
        generalNewsPointData = generalNewsPoint.objects.get(id=response['generalNewsPointId'])
        check_db.generalNewsPointId = generalNewsPointData


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Subscribers  -------------------#
@api_view(['POST'])
def add_subscriber(request):
    response = request.data
    check_db = subscribers()

    if 'subscriberName' in request.POST:
        check_db.subscriberName = response['subscriberName']

    if 'subscriberEmail' in request.POST:
        check_db.subscriberEmail = response['subscriberEmail']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Subscribers -------------------#
@api_view(['POST'])
def delete_subscriber(request):
    response = request.data
    check_db = subscribers.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Faq  -------------------#
@api_view(['POST'])
def add_faq(request):
    response = request.data
    check_db = eventFaqs()

    if 'faqQuestion' in request.POST:
        check_db.faqQuestion = response['faqQuestion']

    if 'faqAnswer' in request.POST:
        check_db.faqAnswer = response['faqAnswer']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Faq  -------------------#
@api_view(['POST'])
def edit_faq(request):
    response = request.data
    check_db = eventFaqs.objects.get(id=response['id'])

    if 'faqQuestion' in request.POST:
        check_db.faqQuestion = response['faqQuestion']

    if 'faqAnswer' in request.POST:
        check_db.faqAnswer = response['faqAnswer']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Faq  -------------------#
@api_view(['POST'])
def delete_faq(request):
    response = request.data
    check_db = eventFaqs.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Contact Us Request  -------------------#
@api_view(['POST'])
def add_contactUsRequest(request):
    response = request.data
    check_db = contactUsData()

    if 'contactPersonName' in request.POST:
        check_db.contactPersonName = response['contactPersonName']

    if 'contactPersonCompanyName' in request.POST:
        check_db.contactPersonCompanyName = response['contactPersonCompanyName']

    if 'contactPersonEmail' in request.POST:
        check_db.contactPersonEmail = response['contactPersonEmail']

    if 'contactPersonMobile' in request.POST:
        check_db.contactPersonMobile = response['contactPersonMobile']

    if 'contactPersonMessage' in request.POST:
        check_db.contactPersonMessage = response['contactPersonMessage']

    if 'contactUsReason' in request.POST:
        check_db.contactUsReason = response['contactUsReason']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Contact Us Page Static Data-------------------#
@api_view(['POST'])
def add_contactUsPageStaticData(request):
    response = request.data
    existing_entry = contactUsPageData.objects.first()
    if existing_entry:
        # Update the existing entry
        check_db = existing_entry
    else:
        check_db = contactUsPageData()

    if 'emailLogo' in request.POST:
        check_db.emailLogo = response['emailLogo']

    if 'sectionTitle' in request.POST:
        check_db.sectionTitle = response['sectionTitle']

    if 'sectionShortParagraph' in request.POST:
        check_db.sectionShortParagraph = response['sectionShortParagraph']

    if not existing_entry:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Contact Us Page Helper -------------------#
@api_view(['POST'])
def add_contactUsPageHelper(request):
    response = request.data
    check_db = contactUsHelpData()

    if 'reasonToHelp' in request.POST:
        check_db.reasonToHelp = response['reasonToHelp']

    if 'helpingPersonName' in request.POST:
        check_db.helpingPersonName = response['helpingPersonName']

    if 'helpingPersonDesignation' in request.POST:
        check_db.helpingPersonDesignation = response['helpingPersonDesignation']

    if 'helpingPersonEmail' in request.POST:
        check_db.helpingPersonEmail = response['helpingPersonEmail']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Contact Us Page Helper -------------------#
@api_view(['POST'])
def edit_contactUsPageHelper(request):
    response = request.data
    check_db = contactUsHelpData.objects.get(id=response['id'])

    if 'reasonToHelp' in request.POST:
        check_db.reasonToHelp = response['reasonToHelp']

    if 'helpingPersonName' in request.POST:
        check_db.helpingPersonName = response['helpingPersonName']

    if 'helpingPersonDesignation' in request.POST:
        check_db.helpingPersonDesignation = response['helpingPersonDesignation']

    if 'helpingPersonEmail' in request.POST:
        check_db.helpingPersonEmail = response['helpingPersonEmail']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Contact Us Page Helper  -------------------#
@api_view(['POST'])
def delete_contactUsPageHelper(request):
    response = request.data
    check_db = contactUsHelpData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Media Page Helpers -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def mediaPageHelpersFun(request):
    mediaPageHelpers_list = mediaPageHelpers.objects.all().filter(isDelete='No')
    mediaPageHelpersList = []
    for helper in mediaPageHelpers_list:
        x={
            'id':helper.id,
            'companyPersonName':helper.companyPersonName,
            'companyPersonEmail':helper.companyPersonEmail,
            'companyPersonPhone':helper.companyPersonPhone,
            'created_at': helper.created_at,
            'updated_at': helper.updated_at,
            'created_by': helper.created_by,
            'updated_by': helper.updated_by,
        }
        mediaPageHelpersList.append(x)
    return JsonResponse({'mediaPageHelpers': mediaPageHelpersList, 'status': True})

#------------------- Api For Add Media Page Helpers-------------------#
@api_view(['POST'])
def add_mediaPageHelpers(request):
    response = request.data
    check_db = mediaPageHelpers()

    if 'companyPersonName' in request.POST:
        check_db.companyPersonName = response['companyPersonName']

    if 'companyPersonEmail' in request.POST:
        check_db.companyPersonEmail = response['companyPersonEmail']

    if 'companyPersonPhone' in request.POST:
        check_db.companyPersonPhone = response['companyPersonPhone']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Media Page Helpers-------------------#
@api_view(['POST'])
def edit_mediaPageHelpers(request):
    response = request.data
    check_db = mediaPageHelpers.objects.get(id=response['id'])

    if 'companyPersonName' in request.POST:
        check_db.companyPersonName = response['companyPersonName']

    if 'companyPersonEmail' in request.POST:
        check_db.companyPersonEmail = response['companyPersonEmail']

    if 'companyPersonPhone' in request.POST:
        check_db.companyPersonPhone = response['companyPersonPhone']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Media Page Helpers -------------------#
@api_view(['POST'])
def delete_mediaPageHelpers(request):
    response = request.data
    check_db = mediaPageHelpers.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Press Media Page Static Data-------------------#
@api_view(['POST'])
def add_pressMediaPageStaticData(request):
    response = request.data
    check_db = pressMediaPageData()

    if 'pressMediaPageTitle' in request.POST:
        check_db.pressMediaPageTitle = response['pressMediaPageTitle']

    if 'pressMediaPageDescription' in request.POST:
        check_db.pressMediaPageDescription = response['pressMediaPageDescription']

    if 'pressMediaPageSecondTitle' in request.POST:
        check_db.pressMediaPageSecondTitle = response['pressMediaPageSecondTitle']

    if 'pressMediaPageSecondSectionImage' in request.POST:
        check_db.pressMediaPageSecondSectionImage = response['pressMediaPageSecondSectionImage']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Press Media Page Box Data-------------------#
@api_view(['POST'])
def add_pressediaPageBoxData(request):
    response = request.data
    check_db = pressMediaPageBoxData()

    if 'boxTitle' in request.POST:
        check_db.boxTitle = response['boxTitle']

    if 'boxDescription' in request.POST:
        check_db.boxDescription = response['boxDescription']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Package Benifits-------------------#
# @api_view(['POST'])
# def add_sponsorPackageBenifit(request):
#     response = request.data
#     check_db = sponsorBenefits()

#     if 'benefitTitle' in request.POST:
#         check_db.benefitTitle = response['benefitTitle']

#     if 'benefitInfo' in request.POST:
#         check_db.benefitInfo = response['benefitInfo']

#     check_db.created_by = "Admin"
#     check_db.updated_by = "Admin"
#     check_db.save()

#     return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Package-------------------#
@api_view(['POST'])
def add_sponsorPackageType(request):
    response = request.data
    check_db = sponsorPackageTypes()

    if 'sponsorPackageType' in request.POST:
        check_db.sponsorPackageType = response['sponsorPackageType']

    if 'sponsorPackagePrice' in request.POST:
        check_db.sponsorPackagePrice = response['sponsorPackagePrice']

    if 'sponsorPackageCuttingPrice' in request.POST:
        check_db.sponsorPackageCuttingPrice = response['sponsorPackageCuttingPrice']

    if 'delegatePassQty' in request.POST:
        check_db.delegatePassQty = response['delegatePassQty']

    if 'inviteDiscount' in request.POST:
        check_db.inviteDiscount = response['inviteDiscount']

    if 'exhibitSpace' in request.POST:
        check_db.exhibitSpace = response['exhibitSpace']

    if 'sponsorPackageShowOrder' in request.POST:
        check_db.sponsorPackageShowOrder = response['sponsorPackageShowOrder']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor Package-------------------#
@api_view(['POST'])
def edit_sponsorPackageType(request):
    response = request.data
    check_db = sponsorPackageTypes.objects.get(id=response['id'])

    if 'sponsorPackageType' in request.POST:
        check_db.sponsorPackageType = response['sponsorPackageType']

    if 'sponsorPackagePrice' in request.POST:
        check_db.sponsorPackagePrice = response['sponsorPackagePrice']

    if 'sponsorPackageCuttingPrice' in request.POST:
        check_db.sponsorPackageCuttingPrice = response['sponsorPackageCuttingPrice']

    if 'delegatePassQty' in request.POST:
        check_db.delegatePassQty = response['delegatePassQty']

    if 'inviteDiscount' in request.POST:
        check_db.inviteDiscount = response['inviteDiscount']

    if 'exhibitSpace' in request.POST:
        check_db.exhibitSpace = response['exhibitSpace']

    if 'sponsorPackageShowOrder' in request.POST:
        check_db.sponsorPackageShowOrder = response['sponsorPackageShowOrder']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor Package-------------------#
@api_view(['POST'])
def delete_sponsorPackageType(request):
    response = request.data
    check_db = sponsorPackageTypes.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Package Inclusions  -------------------#
# @api_view(['POST'])
# def add_sponsorPackageInclusion(request):
#     response = request.data
#     check_db = sponsorPackageInclusions()

#     if 'sponsorPackageTypeId' in request.POST:
#         packageTypeData = sponsorPackageTypes.objects.get(id=response['sponsorPackageTypeId'])
#         check_db.sponsorPackageTypeId = packageTypeData

#     if 'sponsorBenifitId' in request.POST:
#         benefitPointData = sponsorBenefits.objects.get(id=response['sponsorBenifitId'])
#         check_db.sponsorBenifitId = benefitPointData

#     if 'benefitValue' in request.POST:
#         check_db.benefitValue = response['benefitValue']

#     check_db.created_by = "Admin"
#     check_db.updated_by = "Admin"
#     check_db.save()

#     return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Addon Type-------------------#
@api_view(['POST'])
def add_sponsorAddonType(request):
    response = request.data
    check_db = sponsorPackageAddOnTypes()

    if 'addOnTypeName' in request.POST:
        check_db.addOnTypeName = response['addOnTypeName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor Addon Type-------------------#
@api_view(['POST'])
def edit_sponsorAddonType(request):
    response = request.data
    check_db = sponsorPackageAddOnTypes.objects.get(id=response['id'])

    if 'addOnTypeName' in request.POST:
        check_db.addOnTypeName = response['addOnTypeName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor Add on Type-------------------#
@api_view(['POST'])
def delete_sponsorAddonType(request):
    response = request.data
    check_db = sponsorPackageAddOnTypes.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Sponsor Package Add Ons  -------------------#
@api_view(['POST'])
def add_sponsorPackageAddOns(request):
    response = request.data
    check_db = sponsorPackageAddOns()

    if 'sponsorPackageAddOnTypeId' in request.POST:
        sponsorPackageAddOnTypeData = sponsorPackageAddOnTypes.objects.get(id=response['sponsorPackageAddOnTypeId'])
        check_db.sponsorPackageAddOnTypeId = sponsorPackageAddOnTypeData

    if 'sponsorAddOnName' in request.POST:
        check_db.sponsorAddOnName = response['sponsorAddOnName']

    if 'sponsorAddOnPrice' in request.POST:
        check_db.sponsorAddOnPrice = response['sponsorAddOnPrice']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor Package Add Ons  -------------------#
@api_view(['POST'])
def edit_sponsorPackageAddOns(request):
    response = request.data
    check_db = sponsorPackageAddOns.objects.get(id=response['id'])

    if 'sponsorPackageAddOnTypeId' in request.POST:
        sponsorPackageAddOnTypeData = sponsorPackageAddOnTypes.objects.get(id=response['sponsorPackageAddOnTypeId'])
        check_db.sponsorPackageAddOnTypeId = sponsorPackageAddOnTypeData

    if 'sponsorAddOnName' in request.POST:
        check_db.sponsorAddOnName = response['sponsorAddOnName']

    if 'sponsorAddOnPrice' in request.POST:
        check_db.sponsorAddOnPrice = response['sponsorAddOnPrice']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor Add on-------------------#
@api_view(['POST'])
def delete_sponsorPackageAddOns(request):
    response = request.data
    check_db = sponsorPackageAddOns.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Delegate  -------------------#
@api_view(['POST'])
def add_delegate(request):
    response = request.data
    #------------------- code for Register The Company -------------------#
    check_db_1 = registeredCompanyDetails()
    if 'purchasedDelegatePackageId' in request.POST:
        selectedDelegatePackageData = eventDeligatePackages.objects.get(id=response['purchasedDelegatePackageId'])
        check_db_1.purchasedDelegatePackageId = selectedDelegatePackageData

    if 'companyName' in request.POST:
        check_db_1.companyName = response['companyName']

    if 'companyWebsite' in request.POST:
        check_db_1.companyWebsite = response['companyWebsite']

    if 'companyAddress' in request.POST:
        check_db_1.companyAddress = response['companyAddress']

    if 'companyCountry' in request.POST:
        check_db_1.companyCountry = response['companyCountry']

    if 'companyState' in request.POST:
        check_db_1.companyState = response['companyState']

    if 'companyCity' in request.POST:
        check_db_1.companyCity = response['companyCity']

    if 'companyPincode' in request.POST:
        check_db_1.companyPincode = response['companyPincode']

    check_db_1.created_by = "Admin"
    check_db_1.updated_by = "Admin"
    check_db_1.save()

    #------------------- code for Register The Company Delegates -------------------#
    if 'delegateList' in request.POST:
        delegateListArr = response['delegateList']
        for delegate in json.loads(delegateListArr):
            check_db_2 = registeredDelegates()
            check_db_2.relatedCompanyId = check_db_1
            if 'firstName' in delegate:
                check_db_2.firstName = delegate['firstName']
            if 'lastName' in delegate:
                check_db_2.lastName = delegate['lastName']
            if 'mobile' in delegate:
                check_db_2.mobile = delegate['mobile']
            if 'position' in delegate:
                check_db_2.position = delegate['position']
            if 'email' in delegate:
                check_db_2.delegateEmail = delegate['email']
            check_db_2.created_by = "Admin"
            check_db_2.updated_by = "Admin"
            check_db_2.save()

    #------------------- code for Add data of company Add ons -------------------#
    
    if 'addOns' in request.POST:
        addOnsArr = response['addOns']
        for addOn in json.loads(addOnsArr):
            check_db_3 = addOnsHistory()
            check_db_3.relatedCompanyId = check_db_1
            addOnTypeData = delegatesAddOns.objects.get(id=addOn['id'])
            check_db_3.addOnId = addOnTypeData
            check_db_3.created_by = "Admin"
            check_db_3.updated_by = "Admin"
            check_db_3.save()

    #------------------- code for Add data of company Used Offer Coupons -------------------#
    if 'couponCode' in request.POST:
        check_db_4 =offerCouponHistory()
        check_db_4.relatedCompanyId = check_db_1
        offerCouponData = offerCoupon.objects.get(couponCode=response['couponCode'],isDelete="No")
        check_db_4.offerCouponId = offerCouponData
        check_db_4.save()

    #------------------- code for Add data of Delegate Transection -------------------#
    check_db_5 =delegateTransectionData()
    check_db_5.relatedCompanyId = check_db_1
    if 'totalPassAmount' in request.POST:
        check_db_5.totalPassAmount = response['totalPassAmount']
    if 'discountAmount' in request.POST:
        check_db_5.discountAmount = response['discountAmount']
    if 'addOnsAmount' in request.POST:
        check_db_5.addOnsAmount = response['addOnsAmount']
    if 'taxableCharge' in request.POST:
        check_db_5.taxableCharge = response['taxableCharge']
    if 'totalPaidAmount' in request.POST:
        check_db_5.totalPaidAmount = response['totalPaidAmount']
    if 'transectionId' in request.POST:
        check_db_5.transectionId = response['transectionId']
    if 'transectionType' in request.POST:
        check_db_5.transectionType = response['transectionType']
    if 'invoiceNo' in request.POST:
        check_db_5.invoiceNo = response['invoiceNo']

    check_db_5.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})


#------------------- Api For Add Sponsor  -------------------#
@api_view(['POST'])
def add_newSponsor(request):
    response = request.data
    #------------------- code for Register The Company -------------------#
    check_db_1 = sponseredCompanyDetails()
    if 'sponsorPackageTypeId' in request.POST:
        selectedSponsorPackageData = sponsorPackageTypes.objects.get(id=response['sponsorPackageTypeId'])
        check_db_1.sponsorPackageTypeId = selectedSponsorPackageData

    if 'companyName' in request.POST:
        check_db_1.companyName = response['companyName']

    if 'companyWebsite' in request.POST:
        check_db_1.companyWebsite = response['companyWebsite']

    if 'companyAddress' in request.POST:
        check_db_1.companyAddress = response['companyAddress']

    if 'companyCountry' in request.POST:
        check_db_1.companyCountry = response['companyCountry']

    if 'companyState' in request.POST:
        check_db_1.companyState = response['companyState']

    if 'companyCity' in request.POST:
        check_db_1.companyCity = response['companyCity']

    if 'companyPincode' in request.POST:
        check_db_1.companyPincode = response['companyPincode']

    check_db_1.created_by = "Admin"
    check_db_1.updated_by = "Admin"
    check_db_1.save()

    #------------------- code for Register The Company Delegates -------------------#
    if 'delegateList' in request.POST:
        delegateListArr = response['delegateList']
        for delegate in json.loads(delegateListArr):
            check_db_2 = registeredSponseredDelegates()
            check_db_2.relatedSponsorCompanyId = check_db_1
            if 'firstName' in delegate:
                check_db_2.firstName = delegate['firstName']
            if 'lastName' in delegate:
                check_db_2.lastName = delegate['lastName']
            if 'mobile' in delegate:
                check_db_2.mobile = delegate['mobile']
            if 'position' in delegate:
                check_db_2.position = delegate['position']
            if 'email' in delegate:
                check_db_2.delegateEmail = delegate['email']
            check_db_2.created_by = "Admin"
            check_db_2.updated_by = "Admin"
            check_db_2.save()

    #------------------- code for Add data of company Add ons -------------------#
    
    if 'addOns' in request.POST:
        addOnsArr = response['addOns']
        for addOn in json.loads(addOnsArr):
            check_db_3 = sponsoredCompanyAddOnsDetails()
            check_db_3.relatedSponsorCompanyId = check_db_1
            addOnTypeData = sponsorPackageAddOns.objects.get(id=addOn['id'])
            check_db_3.relatedSponsorAddOnsId = addOnTypeData
            check_db_3.created_by = "Admin"
            check_db_3.updated_by = "Admin"
            check_db_3.save()

    #------------------- code for Add data of company Used Offer Coupons -------------------#
    if 'offerCouponId' in request.POST:
        check_db_4 =sponsorOfferCouponHistory()
        check_db_4.relatedSponsorCompanyId = check_db_1
        offerCouponData = offerCoupon.objects.get(couponCode=response['couponCode'],isDelete="No")
        check_db_4.offerCouponId = offerCouponData
        check_db_4.save()

    #------------------- code for Add data of Delegate Transection -------------------#
    check_db_5 =sponsorCompanyTransectionData()
    check_db_5.relatedSponsorCompanyId = check_db_1
    if 'totalPassAmount' in request.POST:
        check_db_5.totalPassAmount = response['totalPassAmount']
    if 'additionalDelegateAmoount' in request.POST:
        check_db_5.additionalDelegateAmoount = response['additionalDelegateAmoount']
    if 'discountAmount' in request.POST:
        check_db_5.discountAmount = response['discountAmount']
    if 'addOnsAmount' in request.POST:
        check_db_5.addOnsAmount = response['addOnsAmount']
    if 'taxableCharge' in request.POST:
        check_db_5.taxableCharge = response['taxableCharge']
    if 'totalPaidAmount' in request.POST:
        check_db_5.totalPaidAmount = response['totalPaidAmount']
    if 'transectionId' in request.POST:
        check_db_5.transectionId = response['transectionId']
    if 'transectionType' in request.POST:
        check_db_5.transectionType = response['transectionType']
    if 'invoiceNo' in request.POST:
        check_db_5.invoiceNo = response['invoiceNo']

    check_db_5.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Stand Out Crows  Request  -------------------#
@api_view(['POST'])
def add_standOutCrowdRequest(request):
    response = request.data
    check_db = standOutCrowdRequestData()

    if 'requesterName' in request.POST:
        check_db.requesterName = response['requesterName']

    if 'requesterCompanyName' in request.POST:
        check_db.requesterCompanyName = response['requesterCompanyName']

    if 'requesterMobile' in request.POST:
        check_db.requesterMobile = response['requesterMobile']

    if 'requesterEmail' in request.POST:
        check_db.requesterEmail = response['requesterEmail']

    if 'requesterMessage' in request.POST:
        check_db.requesterMessage = response['requesterMessage']


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Stand Out Crowd Request Data List  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def standOutCrowdRequestListFun(request):
    standCrowd_list = standOutCrowdRequestData.objects.all().filter(isDelete='No').order_by('-id')
    StandCrowdList = []
    for request in standCrowd_list:
        x={
            'id':request.id,
            'requesterName':request.requesterName,
            'requesterCompanyName':request.requesterCompanyName,
            'requesterMobile':request.requesterMobile,
            'requesterEmail':request.requesterEmail,
            'requesterMessage':request.requesterMessage,
            'created_at': request.created_at,
            'updated_at': request.updated_at,
            'created_by': request.created_by,
            'updated_by': request.updated_by,
        }
        StandCrowdList.append(x)
    return JsonResponse({'standOutCrowdList': StandCrowdList, 'status': True})

#------------------- Api For Delete Stand Out Crowd Request Request -------------------#
@api_view(['POST'])
def delete_standOutCrowdRequest(request):
    response = request.data
    check_db = standOutCrowdRequestData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Become Speaker Form Request  -------------------#
@api_view(['POST'])
def add_becomeSpeakerRequest(request):
    response = request.data
    check_db = becomeSpeakerRequestData()

    if 'requesterName' in request.POST:
        check_db.requesterName = response['requesterName']

    if 'requesterCompanyName' in request.POST:
        check_db.requesterCompanyName = response['requesterCompanyName']

    if 'proposedTitle' in request.POST:
        check_db.proposedTitle = response['proposedTitle']

    if 'requesterEmail' in request.POST:
        check_db.requesterEmail = response['requesterEmail']

    if 'requesterMessage' in request.POST:
        check_db.requesterMessage = response['requesterMessage']


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Become Speaker Form Request List  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def becomeSpeakerFormRequestListFun(request):
    becomeSpeaker_list = becomeSpeakerRequestData.objects.all().filter(isDelete='No').order_by('-id')
    becomeSpeakerList = []
    for request in becomeSpeaker_list:
        x={
            'id':request.id,
            'requesterName':request.requesterName,
            'requesterCompanyName':request.requesterCompanyName,
            'proposedTitle':request.proposedTitle,
            'requesterEmail':request.requesterEmail,
            'requesterMessage':request.requesterMessage,
            'created_at': request.created_at,
            'updated_at': request.updated_at,
            'created_by': request.created_by,
            'updated_by': request.updated_by,
        }
        becomeSpeakerList.append(x)
    return JsonResponse({'becomeSpeakerList': becomeSpeakerList, 'status': True})

#------------------- Api For Delete Stand Out Crowd Request Request -------------------#
@api_view(['POST'])
def delete_becomeSpeakerRequest(request):
    response = request.data
    check_db = becomeSpeakerRequestData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Quick Proposal Form Request  -------------------#
@api_view(['POST'])
def add_quickProposalRequest(request):
    response = request.data
    check_db = quickProposalRequestData()

    if 'requesterName' in request.POST:
        check_db.requesterName = response['requesterName']

    if 'requesterCompanyName' in request.POST:
        check_db.requesterCompanyName = response['requesterCompanyName']

    if 'proposedTitle' in request.POST:
        check_db.proposedTitle = response['proposedTitle']

    if 'requesterEmail' in request.POST:
        check_db.requesterEmail = response['requesterEmail']

    if 'requesterMessage' in request.POST:
        check_db.requesterMessage = response['requesterMessage']


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Become Speaker Form Request List  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def quickProposalFormRequestListFun(request):
    quickProposal_list = quickProposalRequestData.objects.all().filter(isDelete='No').order_by('-id')
    quickProposalList = []
    for request in quickProposal_list:
        x={
            'id':request.id,
            'requesterName':request.requesterName,
            'requesterCompanyName':request.requesterCompanyName,
            'proposedTitle':request.proposedTitle,
            'requesterEmail':request.requesterEmail,
            'requesterMessage':request.requesterMessage,
            'created_at': request.created_at,
            'updated_at': request.updated_at,
            'created_by': request.created_by,
            'updated_by': request.updated_by,
        }
        quickProposalList.append(x)
    return JsonResponse({'quickProposalList': quickProposalList, 'status': True})

#------------------- Api For Delete Stand Out Crowd Request Request -------------------#
@api_view(['POST'])
def delete_quickProposalRequest(request):
    response = request.data
    check_db = quickProposalRequestData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})


#------------------- Api For Add End User Pass Registration Form Request  -------------------#
@api_view(['POST'])
def add_endUserPassRegistrationRequest(request):
    response = request.data
    check_db = endUserPassRegistrationRequestData()

    if 'userName' in request.POST:
        check_db.userName = response['userName']

    if 'userCompany' in request.POST:
        check_db.userCompany = response['userCompany']

    if 'userEmail' in request.POST:
        check_db.userEmail = response['userEmail']

    if 'userMobile' in request.POST:
        check_db.userMobile = response['userMobile']

    if 'userInterest' in request.POST:
        check_db.userInterest = response['userInterest']

    if 'noOfAttandees' in request.POST:
        check_db.noOfAttandees = response['noOfAttandees']

    if 'userMessage' in request.POST:
        check_db.userMessage = response['userMessage']


    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get End User Pass Registration Request List  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def endUserPassRegistrationListFun(request):
    registration_list = endUserPassRegistrationRequestData.objects.all().filter(isDelete='No').order_by('-id')
    registrationList = []
    for request in registration_list:
        x={
            'id':request.id,
            'userName':request.userName,
            'userCompany':request.userCompany,
            'userEmail':request.userEmail,
            'userMobile':request.userMobile,
            'userInterest':request.userInterest,
            'noOfAttandees':request.noOfAttandees,
            'userMessage':request.userMessage,
            'created_at': request.created_at,
            'updated_at': request.updated_at,
            'created_by': request.created_by,
            'updated_by': request.updated_by,
        }
        registrationList.append(x)
    return JsonResponse({'registrationList': registrationList, 'status': True})

#------------------- Api For Delete End User Pass Registration Request -------------------#
@api_view(['POST'])
def delete_endUserPassRegRequest(request):
    response = request.data
    check_db = endUserPassRegistrationRequestData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Add Home Past Attandee  -------------------#
@api_view(['POST'])
def add_homePastAttandee(request):
    response = request.data
    check_db = pastAttandeeHomeData()

    if 'attandeeName' in request.POST:
        check_db.attandeeName = response['attandeeName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Home Past Attandees-------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def homePastAttandeeListFun(request):
    homeAttandee_list = pastAttandeeHomeData.objects.all().filter(isDelete='No')
    homeAttandeeList = []
    for att in homeAttandee_list:
        x={
            'id':att.id,
            'attandeeName':att.attandeeName,
            'created_at': att.created_at,
            'updated_at': att.updated_at,
            'created_by': att.created_by,
            'updated_by': att.updated_by,
        }
        homeAttandeeList.append(x)
    return JsonResponse({'homePastAttandees': homeAttandeeList, 'status': True})

#------------------- Api For Delete Home Past Attandee -------------------#
@api_view(['POST'])
def delete_homePastAttandee(request):
    response = request.data
    check_db = pastAttandeeHomeData.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Home Past Attandee-------------------#
@api_view(['POST'])
def edit_homePastAttandee(request):
    response = request.data
    check_db = pastAttandeeHomeData.objects.get(id=response['id'])

    if 'attandeeName' in request.POST:
        check_db.attandeeName = response['attandeeName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Leader List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventLeaderListFun(request):
    leaders_Data = eventLeaders.objects.all().filter(isDelete='No')
    leadersList = []
    for leader in leaders_Data:
        x={
            'id':leader.id,
            'leaderName':leader.leaderName,
            'leaderLogo':leader.leaderLogo,
            'created_at': leader.created_at,
            'updated_at': leader.updated_at,
            'created_by': leader.created_by,
            'updated_by': leader.updated_by,
        }
        leadersList.append(x) 
    return JsonResponse({'eventLeaders': leadersList, 'status': True})

#------------------- Api For Add Event Leader-------------------#
@api_view(['POST'])
def add_eventLeader(request):
    response = request.data
    check_db = eventLeaders()

    if 'leaderName' in request.POST:
        check_db.leaderName = response['leaderName']

    if 'leaderLogo' in request.POST:
        check_db.leaderLogo = response['leaderLogo']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Event Leader-------------------#
@api_view(['POST'])
def edit_eventLeader(request):
    response = request.data
    check_db = eventLeaders.objects.get(id=response['id'])

    if 'leaderName' in request.POST:
        check_db.leaderName = response['leaderName']

    if 'leaderLogo' in request.POST:
        check_db.leaderLogo = response['leaderLogo']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Event Leader -------------------#
@api_view(['POST'])
def delete_eventLeader(request):
    response = request.data
    check_db = eventLeaders.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Speaker Data from Speaker Id  -------------------#
@api_view(['POST'])
def getSpeakerDataById(request):
    response = request.data
    speakerId = response['speakerId']
    getSpeakerData_list = eventSpeakers.objects.filter(id=speakerId,isDelete='No').all()
    speakerProfileData = []
    for speaker in getSpeakerData_list:
        x={
            'id':speaker.id,
            'eventSpeakerName':speaker.eventSpeakerName,
            'eventSpeakerCompany':speaker.eventSpeakerCompany,
            'eventSpeakerShortDescription':speaker.eventSpeakerShortDescription,
            'eventSpeakerDescription':speaker.eventSpeakerDescription,
            'viewSpeakerButtonLabel':speaker.viewSpeakerButtonLabel,
            'speakerProfilePageLink':speaker.speakerProfilePageLink,
            'eventSpeakerHomePageImage':speaker.eventSpeakerHomePageImage,
            'eventSpeakerProfilePageImage':speaker.eventSpeakerProfilePageImage,
            'eventSpeakerFeaturedPageImage':speaker.eventSpeakerFeaturedPageImage,
            'eventSpeakerEmail':speaker.eventSpeakerEmail,
            'eventSpeakerProposedTitle':speaker.eventSpeakerProposedTitle,
            'isParticipated':speaker.isParticipated,
            'eventSpeakerProfilePageDescription':speaker.eventSpeakerProfilePageDescription,
            'eventSpeakerMetaTitle':speaker.eventSpeakerMetaTitle,
            'eventSpeakerMetaDescription':speaker.eventSpeakerMetaDescription,
            'eventSpeakerLinkedinFollowers':speaker.eventSpeakerLinkedinFollowers,
            'created_at': speaker.created_at,
            'updated_at': speaker.updated_at,
            'created_by': speaker.created_by,
            'updated_by': speaker.updated_by,
        }
        speakerProfileData.append(x)

    return JsonResponse({'speakerData': speakerProfileData, 'status': True})

#------------------- Api For Get News Data from News Id  -------------------#
@api_view(['POST'])
def getNewsDataById(request):
    response = request.data
    newsId = response['newsId']
    getNewsData_list = generalNewsPoint.objects.filter(id=newsId,isDelete='No').all()
    NewsData = []
    for news in getNewsData_list:
        newsCat = {}
        if news.newsCategoryId != None:
            newsCat = {
                'id':news.newsCategoryId.id,
                'newsCategory':news.newsCategoryId.categoryName,
            }
        x={
            'id':news.id,
            'newsCategoryDetails':newsCat,
            'newsTitle':news.newsTitle,
            'newsDescription':news.newsDescription,
            'newsShortDescription':news.newsShortDescription,
            'newsPageUrl':news.newsPageUrl,
            'newsImage':news.newsImage,
            'newsCreatedDate':news.newsCreatedDate,
            'isTopNews':news.isTopNews,
            'newsMetaTitle':news.newsMetaTitle,
            'newsMetaDescription':news.newsMetaDescription,
            'newsImageAltText':news.newsImageAltText,
            'created_at': news.created_at,
            'updated_at': news.updated_at,
            'created_by': news.created_by,
            'updated_by': news.updated_by,
        }
        NewsData.append(x)

    return JsonResponse({'NewsData': NewsData, 'status': True})

#---------------------------- Api For Get Nav Items ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def navItemsFun(request):
    mainCategoriesList = homePageNavMainCategories.objects.all().filter(isDelete='No').order_by('id')
    nav_items = []
    for main in mainCategoriesList:
        nav_item = {
                'name': main.navMainCategoryName,
                'href': main.navMainCategoryPath,
                'isChecked':main.isChecked,
            }
        # Get subcategories for this main category
        subcategories = homePageNavSubCategories.objects.filter(
            navMainCategoryId=main,
            isDelete='No'
            ).order_by('id')
        if subcategories.exists():
                dropdown = []
                for subcategory in subcategories:
                    dropdown.append({
                        'name': subcategory.navSubCategoryName,
                        'href': subcategory.navSubCategoryPath,
                        'isChecked': subcategory.isChecked,
                    })
                nav_item['dropdown'] = dropdown
            
        nav_items.append(nav_item)
    return JsonResponse({'navItems': nav_items, 'status': True})

#------------------- Api For Add Event General Data  -------------------#
@api_view(['POST'])
def add_event_general_data(request):
    response = request.data
    
    # Handle eventDetails
    existing_event = eventDetails.objects.first()
    if existing_event:
        check_db = existing_event
    else:
        check_db = eventDetails()
    
    # Handle homePageNavLogoData
    existing_logo = homePageNavLogoData.objects.first()
    if existing_logo:
        check_db_1 = existing_logo
    else:
        check_db_1 = homePageNavLogoData()
    
    # Handle homePageVideoSectionInput
    existing_video = homePageVideoSectionInput.objects.first()
    if existing_video:
        check_db_2 = existing_video
    else:
        check_db_2 = homePageVideoSectionInput()
    
    # Handle themeColorSettings
    existing_theme = themeColorSettings.objects.first()
    if existing_theme:
        check_db_3 = existing_theme
    else:
        check_db_3 = themeColorSettings()
    
    # Handle eventGeneralSettings
    existing_general = eventGeneralSettings.objects.first()
    if existing_general:
        check_db_4 = existing_general
    else:
        check_db_4 = eventGeneralSettings()

    # Update eventDetails fields
    if 'eventName' in request.POST:
        check_db.eventName = response['eventName']
    if 'eventShortCode' in request.POST:
        check_db.eventShortCode = response['eventShortCode']
    if 'eventDate' in request.POST:
        check_db.eventDate = response['eventDate']
    if 'eventLocation' in request.POST:
        check_db.eventLocation = response['eventLocation']
    if 'eventYear' in request.POST:
        check_db.eventYear = response['eventYear']
    if 'eventShortDate' in request.POST:
        check_db.eventShortDate = response['eventShortDate']

    if 'eventShortLocation' in request.POST:
        check_db.eventShortLocation = response['eventShortLocation']

    if 'eventColorName' in request.POST:
        check_db.eventColorName = response['eventColorName']
    
    if 'eventCityShortCode' in request.POST:
        check_db.eventCityShortCode = response['eventCityShortCode']

    if 'eventPostponed' in request.POST:
        check_db.eventPostponed = response['eventPostponed']

    if 'industryName' in request.POST:
        check_db.industryName = response['industryName']

    if 'previousAgenda' in request.POST:
        check_db.previousAgenda = response['previousAgenda']

    if 'hubspotDisposition' in request.POST:
        check_db.hubspotDisposition = response['hubspotDisposition']

    if 'hubspotEmailStatus' in request.POST:
        check_db.hubspotEmailStatus = response['hubspotEmailStatus']

    if 'eventType' in request.POST:
        check_db.eventType = response['eventType']

    if 'isSeoEnable' in request.POST:
        check_db.isSeoEnable = response['isSeoEnable']

    if 'agendaVersion' in request.POST:
        check_db.agendaVersion = response['agendaVersion']

    if 'stripeMode' in request.POST:
        check_db.stripeMode = response['stripeMode']

    if 'recaptchaKey' in request.POST:
        check_db.recaptchaKey = response['recaptchaKey']

    if 'hubspotId' in request.POST:
        check_db.hubspotId = response['hubspotId']

    if 'contactHubspotId' in request.POST:
        check_db.contactHubspotId = response['contactHubspotId']

    if 'googleTranslate' in request.POST:
        check_db.googleTranslate = response['googleTranslate']

    if 'favicon' in request.POST:
        check_db.favicon = response['favicon']

    # Update homePageNavLogoData fields
    if 'whiteLogoLink' in request.POST:
        check_db_1.whiteLogoLink = response['whiteLogoLink']
    
    if 'blackLogoLink' in request.POST:
        check_db_1.blackLogoLink = response['blackLogoLink']
    
    # Update homePageVideoSectionInput fields
    if 'videoLinkmp4' in request.POST:
        check_db_2.videoLinkmp4 = response['videoLinkmp4']
    
    if 'videoLinkwebm' in request.POST:
        check_db_2.videoLinkwebm = response['videoLinkwebm']
    
    if 'eventDetailBackImage' in request.POST:
        check_db_2.eventDetailBackImage = response['eventDetailBackImage']
    
    if 'eventStataticsBackImage' in request.POST:
        check_db_2.eventStataticsBackImage = response['eventStataticsBackImage']
    
    if 'eventExpertSpeakerBackImage' in request.POST:
        check_db_2.eventExpertSpeakerBackImage = response['eventExpertSpeakerBackImage']

    if 'videoReplaceImage' in request.POST:
        check_db_2.videoReplaceImage = response['videoReplaceImage']
    
    # Update themeColorSettings fields
    if 'primaryColor' in request.POST:
        check_db_3.primaryColor = response['primaryColor']
    
    if 'secondaryColor' in request.POST:
        check_db_3.secondaryColor = response['secondaryColor']
    
    if 'lightColor' in request.POST:
        check_db_3.lightColor = response['lightColor']
    
    if 'darkColor' in request.POST:
        check_db_3.darkColor = response['darkColor']
    
    if 'gradientColor' in request.POST:
        check_db_3.gradientColor = response['gradientColor']

    if 'headerContent' in request.POST:
        check_db_3.headerContent = response['headerContent']

    if 'editorStyle' in request.POST:
        check_db_3.editorStyle = response['editorStyle']

    if 'headerType' in request.POST:
        check_db_3.headerType = response['headerType']
    
    # Update eventGeneralSettings fields
    if 'purchaseTaxPercent' in request.POST:
        check_db_4.purchaseTaxPercent = response['purchaseTaxPercent']
    
    if 'currencyName' in request.POST:
        check_db_4.currencyName = response['currencyName']
    
    if 'currencySymbol' in request.POST:
        check_db_4.currencySymbol = response['currencySymbol']

    if 'currencyPosition' in request.POST:
        check_db_4.currencyPosition = response['currencyPosition']

    # Set created_by and updated_by fields for new entries
    if not existing_event:
        check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    
    if not existing_logo:
        check_db_1.created_by = "Admin"
    check_db_1.updated_by = "Admin"
    
    if not existing_video:
        check_db_2.created_by = "Admin"
    check_db_2.updated_by = "Admin"
    
    if not existing_theme:
        check_db_3.created_by = "Admin"
    check_db_3.updated_by = "Admin"
    
    if not existing_general:
        check_db_4.created_by = "Admin"
    check_db_4.updated_by = "Admin"

    # Save all instances
    check_db.save()
    check_db_1.save()
    check_db_2.save()
    check_db_3.save()
    check_db_4.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Get Industry Trend Data from Trend Id  -------------------#
@api_view(['POST'])
def getIndustryTrendDataById(request):
    response = request.data
    trendId = response['trendId']
    getTrendData_list = eventIndustryTrends.objects.filter(id=trendId,isDelete='No').all()
    trendData = []
    for trend in getTrendData_list:
        x={
            'id':trend.id,
            'trendTitle':trend.trendTitle,
            'trendRedirectPath':trend.trendRedirectPath,
            'trendShortDescription':trend.trendShortDescription,
            'trendLongDescription':trend.trendLongDescription,
            'trendMetaTitle':trend.trendMetaTitle,
            'trendMetaDescription':trend.trendMetaDescription,
            'created_at': trend.created_at,
            'updated_at': trend.updated_at,
            'created_by': trend.created_by,
            'updated_by': trend.updated_by,
        }
        trendData.append(x)

    return JsonResponse({'trendData': trendData, 'status': True})

#---------------------------- Api For get Offer Coupon by Code   ----------------------------#
@api_view(['POST'])
def offerCouponByCodeFun(request):
    response = request.data
    couponCode = response['couponCode']
    print("===================couponCode", couponCode)

    offerCoupons_list = offerCoupon.objects.filter(
        couponCode=couponCode,
        isDelete='No'
    ).all()

    print("===================offerCoupons_list", offerCoupons_list)
    print("===================offerCoupons_list", len(offerCoupons_list))

    if offerCoupons_list.exists():  # ✅ check queryset, not empty list
        offerCouponsList = []
        for coupon in offerCoupons_list:  
            x = {
                'id': coupon.id,
                'couponCode': coupon.couponCode,
                'discountType': coupon.discountType,
                'discountAmount': coupon.discountAmount,
                'couponFor': coupon.couponFor,
                'eventSpecialWord': coupon.eventSpecialWord,
                'created_at': coupon.created_at,
                'updated_at': coupon.updated_at,
                'created_by': coupon.created_by,
                'updated_by': coupon.updated_by,
            }
            offerCouponsList.append(x)
        return JsonResponse({'offerCoupons': offerCouponsList, 'status': True})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Coupon Code'})
    

#----------------------- Payment APIS -----------------------#
import stripe
from django.conf import settings
stripe.api_key = settings.STRIPE_SECRET_KEY
@api_view(['POST'])
def create_payment_intent(request):
    """
    Create a PaymentIntent and return client_secret
    This is called from your frontend after getting the payment method
    """
    try:
        # Parse the request body
        data = json.loads(request.body)
        
        # Extract data from request
        amount = data.get('subTotalAmount')  # Amount in dollars
        payment_method_id = data.get('paymentMethod')  # pm_xxx from frontend
        currency = data.get('currencyCode', 'USD').lower()
        # receipt_email = data.get('receiptemail')
        company_name = data.get('companyName')
        description = data.get('paymentDescription', 'Payment')
        
        # Validate required fields
        if not amount or not payment_method_id:
            return JsonResponse({
                'error': 'Missing required fields: amount or payment_method'
            }, status=400)
        
        # Convert amount to cents (Stripe uses smallest currency unit)
        amount_in_cents = int(float(amount) * 100)
        
        # Create PaymentIntent
        payment_intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency=currency,
            payment_method=payment_method_id,
            company_name=company_name,
            # receipt_email=receipt_email,
            description=description,
            # Automatically confirm the payment
            confirm=True,
            # Return URL for 3D Secure authentication (optional but recommended)
            return_url=f'{settings.SITE_DOMAIN}/payment-success',
            # These are useful metadata you can retrieve later
            metadata={
                'order_id': data.get('order_id', ''),
                'company_name': company_name,
            }
        )
        
        # Return the result
        return JsonResponse({
            'success': True,
            'clientSecret': payment_intent.client_secret,
            'paymentIntentId': payment_intent.id,
            'status': payment_intent.status,
            'message': 'Payment processed successfully'
        })
        
    except stripe.error.CardError as e:
        # Card was declined
        return JsonResponse({
            'success': False,
            'error': str(e.user_message)
        }, status=400)
        
    except stripe.error.InvalidRequestError as e:
        # Invalid parameters
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
        
    except Exception as e:
        # Generic error
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
    
@api_view(['POST'])
def verify_payment(request):
    """
    Verify payment status (optional but recommended)
    """
    try:
        data = json.loads(request.body)
        payment_intent_id = data.get('paymentIntentId')
        
        # Retrieve the PaymentIntent from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        return JsonResponse({
            'status': payment_intent.status,
            'amount': payment_intent.amount / 100,  # Convert back to dollars
            'currency': payment_intent.currency.upper()
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)
    
#------------------- Api For Get list of joined companies  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def joinedCompaniesFun(request):
    company_list = registeredCompanyDetails.objects.all().filter(isDelete='No').order_by('-id')
    joinedCompanyList = []
    for com in company_list:
        related_purchase = {}
        if com.purchasedDelegatePackageId != None:
            related_purchase = {
                'id':com.purchasedDelegatePackageId.id,
                'deligatePackageName':com.purchasedDelegatePackageId.deligatePackageName,
                'deligatePackagePrice':com.purchasedDelegatePackageId.deligatePackagePrice,
            }
        x={
            'id':com.id,
            'relatedPurchaseDetails':related_purchase,
            'companyName':com.companyName,
            'companyWebsite':com.companyWebsite,
            'companyAddress':com.companyAddress,
            'companyCountry':com.companyCountry,
            'companyState':com.companyState,
            'companyCity':com.companyCity,
            'companyPincode':com.companyPincode,
            'created_at': com.created_at,
            'updated_at': com.updated_at,
            'created_by': com.created_by,
            'updated_by': com.updated_by,
        }
        joinedCompanyList.append(x)
    return JsonResponse({'joiedCompanies': joinedCompanyList, 'status': True})

#------------------- Api For Get list of joined Delegates  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def joinedDelegatesFun(request):
    delegate_list = registeredDelegates.objects.all().filter(isDelete='No').order_by('-id')
    joinedDelegateList = []
    for dele in delegate_list:
        related_company = {}
        if dele.relatedCompanyId != None:
            related_company = {
                'id':dele.relatedCompanyId.id,
                'companyName':dele.relatedCompanyId.companyName,
            }
        x={
            'id':dele.id,
            'relatedCompanyDetails':related_company,
            'firstName':dele.firstName,
            'lastName':dele.lastName,
            'mobile':dele.mobile,
            'position':dele.position,
            'delegateEmail':dele.delegateEmail,
            'created_at': dele.created_at,
            'updated_at': dele.updated_at,
            'created_by': dele.created_by,
            'updated_by': dele.updated_by,
        }
        joinedDelegateList.append(x)
    return JsonResponse({'joiedDelegates': joinedDelegateList, 'status': True})

#------------------- Api For Get list of Company Transections  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def companyTransectionsFun(request):
    transection_list = delegateTransectionData.objects.all().filter(isDelete='No').order_by('-id')
    transectionList = []
    for trans in transection_list:
        related_company = {}
        if trans.relatedCompanyId != None:
            related_company = {
                'id':trans.relatedCompanyId.id,
                'companyName':trans.relatedCompanyId.companyName,
            }
        x={
            'id':trans.id,
            'relatedCompanyDetails':related_company,
            'invoiceNo':trans.invoiceNo,
            'totalPassAmount':trans.totalPassAmount,
            'discountAmount':trans.discountAmount,
            'addOnsAmount':trans.addOnsAmount,
            'taxableCharge':trans.taxableCharge,
            'totalPaidAmount':trans.totalPaidAmount,
            'transectionId':trans.transectionId,
            'transectionType':trans.transectionType,
            'created_at': trans.created_at,
            'updated_at': trans.updated_at,
            'created_by': trans.created_by,
            'updated_by': trans.updated_by,
        }
        transectionList.append(x)
    return JsonResponse({'companyTransections': transectionList, 'status': True})
#---------------------------- Api For Get Active Delegate Package ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def getActiveDelegatePackageFun(request):
    activeDelegatePackage_list = eventDeligatePackages.objects.all().filter(isDelete='No',deligatePackageStatus="available").order_by('-id')
    activeDelegatePackagesListData = []
    for delPackage in activeDelegatePackage_list:
        x={
            'id':delPackage.id,
            'deligatePackageName':delPackage.deligatePackageName,
            'deligatePackagePrice':delPackage.deligatePackagePrice,
            'deligatePackageStatus':delPackage.deligatePackageStatus,
            'deligatePackageShowOrder':delPackage.deligatePackageShowOrder,
            'deligatePackageExpiryDate':delPackage.deligatePackageExpiryDate,
            'created_at': delPackage.created_at,
            'updated_at': delPackage.updated_at,
            'created_by': delPackage.created_by,
            'updated_by': delPackage.updated_by,
        }
        activeDelegatePackagesListData.append(x)
    return JsonResponse({'activeDelegatePackage': activeDelegatePackagesListData, 'status': True})

#------------------- Api For Get list of joined Sponsor Companies  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsoredCompaniesFun(request):
    sponsor_company_list = sponseredCompanyDetails.objects.all().filter(isDelete='No').order_by('-id')
    joinedSponsorCompanyList = []
    for com in sponsor_company_list:
        related_purchase = {}
        if com.sponsorPackageTypeId != None:
            related_purchase = {
                'id':com.sponsorPackageTypeId.id,
                'sponsorPackageType':com.sponsorPackageTypeId.sponsorPackageType,
                'sponsorPackagePrice':com.sponsorPackageTypeId.sponsorPackagePrice,
                'delegatePassQty':com.sponsorPackageTypeId.delegatePassQty,
                'inviteDiscount':com.sponsorPackageTypeId.inviteDiscount,
                'exhibitSpace':com.sponsorPackageTypeId.exhibitSpace,
            }
        x={
            'id':com.id,
            'relatedPurchaseDetails':related_purchase,
            'companyName':com.companyName,
            'companyWebsite':com.companyWebsite,
            'companyAddress':com.companyAddress,
            'companyCountry':com.companyCountry,
            'companyState':com.companyState,
            'companyCity':com.companyCity,
            'companyPincode':com.companyPincode,
            'created_at': com.created_at,
            'updated_at': com.updated_at,
            'created_by': com.created_by,
            'updated_by': com.updated_by,
        }
        joinedSponsorCompanyList.append(x)
    return JsonResponse({'joiedSponsorCompanies': joinedSponsorCompanyList, 'status': True})

#------------------- Api For Get list of joined Delegates  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def joinedSponsorDelegatesFun(request):
    sponsor_delegate_list = registeredSponseredDelegates.objects.all().filter(isDelete='No').order_by('-id')
    joinedSponsorDelegateList = []
    for dele in sponsor_delegate_list:
        related_sponsor_company = {}
        if dele.relatedSponsorCompanyId != None:
            related_sponsor_company = {
                'id':dele.relatedSponsorCompanyId.id,
                'companyName':dele.relatedSponsorCompanyId.companyName,
            }
        x={
            'id':dele.id,
            'relatedSponsorCompanyDetails':related_sponsor_company,
            'firstName':dele.firstName,
            'lastName':dele.lastName,
            'mobile':dele.mobile,
            'position':dele.position,
            'delegateEmail':dele.delegateEmail,
            'created_at': dele.created_at,
            'updated_at': dele.updated_at,
            'created_by': dele.created_by,
            'updated_by': dele.updated_by,
        }
        joinedSponsorDelegateList.append(x)
    return JsonResponse({'joiedSponsorDelegates': joinedSponsorDelegateList, 'status': True})

#------------------- Api For Get list of Company Transections  -------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorCompanyTransectionsFun(request):
    sponsor_transection_list = sponsorCompanyTransectionData.objects.all().filter(isDelete='No').order_by('-id')
    sponsorTransectionList = []
    for trans in sponsor_transection_list:
        related_sponsor_company = {}
        if trans.relatedSponsorCompanyId != None:
            related_sponsor_company = {
                'id':trans.relatedSponsorCompanyId.id,
                'companyName':trans.relatedSponsorCompanyId.companyName,
            }
        x={
            'id':trans.id,
            'relatedSponsorCompanyDetails':related_sponsor_company,
            'invoiceNo':trans.invoiceNo,
            'totalPassAmount':trans.totalPassAmount,
            'additionalDelegateAmount':trans.additionalDelegateAmoount,

            'discountAmount':trans.discountAmount,
            'addOnsAmount':trans.addOnsAmount,
            'taxableCharge':trans.taxableCharge,
            'totalPaidAmount':trans.totalPaidAmount,
            'transectionId':trans.transectionId,
            'transectionType':trans.transectionType,
            'created_at': trans.created_at,
            'updated_at': trans.updated_at,
            'created_by': trans.created_by,
            'updated_by': trans.updated_by,
        }
        sponsorTransectionList.append(x)
    return JsonResponse({'sponsorCompanyTransections': sponsorTransectionList, 'status': True})

#------------------- Api For Get Sponsor Data from Sponsor Id  -------------------#
@api_view(['POST'])
def getSponsorDataById(request):
    response = request.data
    sponsorId = response['sponsorId']
    getSponsorData_list = eventSponsors.objects.filter(id=sponsorId,isDelete='No').all()
    sponsorProfileData = []
    for sp in getSponsorData_list:
        x={
            'id':sp.id,
            'sponsorComapnyName':sp.sponsorComapnyName,
            'sponsorComapnyLogo':sp.sponsorComapnyLogo,
            'sponsorType':sp.sponsorType,
            'sponsorComapnyBioDescription':sp.sponsorComapnyBioDescription,
            'sponsorWebsite':sp.sponsorWebsite,
            'sponsorComapnyBioLogo':sp.sponsorComapnyBioLogo,
            'sponsorEmail':sp.sponsorEmail,
            'sponsorMobile':sp.sponsorMobile,
            'relateComapnyPersonName':sp.relateComapnyPersonName,
            'eventSponsorMetaTitle':sp.eventSponsorMetaTitle,
            'eventSponsorMetaDescription':sp.eventSponsorMetaDescription,
            'created_at': sp.created_at,
            'updated_at': sp.updated_at,
            'created_by': sp.created_by,
            'updated_by': sp.updated_by,
        }
        sponsorProfileData.append(x)

    return JsonResponse({'sponsorData': sponsorProfileData, 'status': True})

#---------------------------- Api For Get Theme ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def getThemeFun(request):
    theme = themeColorSettings.objects.filter(isDelete='No').first()
    if not theme:
        return JsonResponse({
            'data': None,
            'status': False,
            'message': 'No theme found'
        })
    data = {
        'id': theme.id,
        'primaryColor': theme.primaryColor,
        'secondaryColor': theme.secondaryColor,
        'lightColor': theme.lightColor,
        'darkColor': theme.darkColor,
        'gradientColor': theme.gradientColor,
        'created_at': theme.created_at,
        'updated_at': theme.updated_at,
        'created_by': theme.created_by,
        'updated_by': theme.updated_by,
    }
    return JsonResponse({
        'themecolors': data,
        'status': True
    })

@csrf_exempt
def send_booking_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract email details from payload
            to_emails = data.get('toemail', '').split(',')  # Convert comma-separated string to list
            cc_emails = data.get('cc', '').split(',') if data.get('cc') else []  # Handle empty cc
            subject = data.get('subject', 'Booking Form Submission')
            html_content = data.get('html', '')
            
            # Remove empty strings from email lists
            to_emails = [email.strip() for email in to_emails if email.strip()]
            cc_emails = [email.strip() for email in cc_emails if email.strip()]
            
            # Plain text fallback (strip HTML tags)
            import re
            text_content = re.sub('<[^<]+?>', '', html_content)
            
            # Create email
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,  # Plain text version
                from_email='int.web@iq-hub.com',  # Change this to your sender email
                to=to_emails,
                cc=cc_emails if cc_emails else None,
            )
            
            # Attach HTML content
            email.attach_alternative(html_content, "text/html")
            
            # Send email
            email.send(fail_silently=False)
            
            return JsonResponse({
                'status': 'success',
                'message': 'Email sent successfully',
                'recipients': to_emails,
                'cc': cc_emails
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=400)

#---------------------------- Api For Send Data to CRM----------------------------#

@api_view(['POST'])
@permission_classes((AllowAny,))
def send_to_crm(request):
    try:
        response = requests.post(
            settings.CRM_WEBHOOK_URL,
            json=request.data,
            headers={
                'Content-Type': 'application/json',
                'X-CRM-API-KEY': settings.CRM_API_KEY,
            }
        )
        return JsonResponse({
            "status": "success",
            "crm_response": response.text
        })
    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        }, status=500)

#---------------------------- Api For Send Data to Zoho----------------------------#

@api_view(['POST'])
def send_to_zoho(request):
    try:
        url = settings.ZOHO_WEBHOOK_URL

        # ✅ Send flat payload directly — Zoho wraps it in webhookTrigger.payload itself
        response = requests.post(url, json=request.data)

        return JsonResponse({
            "status": "success",
            "zoho_response": response.text
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        }, status=500)

@api_view(['GET'])
@permission_classes((AllowAny,))
def agendaListFun(request):
    items = eventAgenda.objects.filter(isDelete="No").order_by('sortOrder')
    serializer = eventAgendaSerializer(items, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes((AllowAny,))
@parser_classes([MultiPartParser, FormParser])
def add_agenda(request):
    serializer = eventAgendaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes((AllowAny,))
@parser_classes([MultiPartParser, FormParser])
def edit_agenda(request):
    item_id = request.data.get('id')
    try:
        item = eventAgenda.objects.get(id=item_id, isDelete="No")
    except eventAgenda.DoesNotExist:
        return JsonResponse({"error": "Item not found"}, status=404)
    
    serializer = eventAgendaSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes((AllowAny,))
def delete_agenda(request):
    item_id = request.data.get('id')
    try:
        item = eventAgenda.objects.get(id=item_id)
        item.isDelete = "Yes"
        item.save()
        
        # Optional: Reorder remaining items to fill the gap
        eventAgenda.objects.filter(isDelete="No", sortOrder__gt=item.sortOrder).update(sortOrder=F('sortOrder') - 1)
        
        return JsonResponse({"message": "Deleted successfully"})
    except eventAgenda.DoesNotExist:
        return JsonResponse({"error": "Item not found"}, status=404)

@api_view(['POST'])
@permission_classes((AllowAny,))
def reorder_agenda(request):
    items_data = request.data.get('items', [])
    if not items_data:
        return JsonResponse({"error": "items list required"}, status=400)
    
    with transaction.atomic():
        for index, item_data in enumerate(items_data):
            i_id = item_data.get('id')
            eventAgenda.objects.filter(id=i_id).update(sortOrder=index)
            
    return JsonResponse({"message": "Reordered successfully"})

@api_view(['GET'])
@permission_classes((AllowAny,))
def userListFun(request):
    users = AdminUser.objects.filter(isDelete="No")
    user_list = []
    for user in users:
        # Merge permissions from role and user
        detailed = user.detailed_permissions.copy()
        if user.role:
            for k, v in user.role.detailed_permissions.items():
                if k in detailed:
                    detailed[k] = list(set(detailed[k] + v))
                else:
                    detailed[k] = v
        
        user_list.append({
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'email': user.email,
            'is_active': user.is_active,
            'role': user.role.name if user.role else "No Role",
            'permissions': [p.id_attr for p in user.permissions.all()], # Keep for compat
            'detailed_permissions': detailed
        })
    return JsonResponse({'status': True, 'userList': user_list})

@api_view(['POST'])
@permission_classes((AllowAny,))
@parser_classes([MultiPartParser, FormParser])
def addUserFun(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role_id = request.data.get('role_id')
    
    if not username or not password or not email:
        return JsonResponse({'status': False, 'message': 'Username, email and password are required'}, status=400)
        
    if AdminUser.objects.filter(username=username, isDelete="No").exists():
        return JsonResponse({'status': False, 'message': 'Username already exists'}, status=400)
    
    user = AdminUser.objects.create_user(username=username, email=email, password=password)
    if role_id:
        try:
            role = AdminRole.objects.get(id=role_id)
            user.role = role
            user.save()
        except AdminRole.DoesNotExist:
            pass
    return JsonResponse({'status': True, 'message': 'User created successfully', 'user': {'id': user.id, 'username': user.username}})


@api_view(['POST'])
@permission_classes((AllowAny,))
def updateUserPermissionsFun(request):
    user_id = request.data.get('id')
    detailed_permissions = request.data.get('detailed_permissions', {}) 
    
    try:
        user = AdminUser.objects.get(id=user_id)
        user.detailed_permissions = detailed_permissions
        # Also sync the ManyToMany for backward compatibility if needed, using keys
        permission_ids = list(detailed_permissions.keys())
        permissions = SidebarSubModule.objects.filter(id_attr__in=permission_ids)
        user.permissions.set(permissions)
        user.save()
        return JsonResponse({'status': True, 'message': 'Permissions updated successfully'})
    except AdminUser.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'User not found'}, status=404)

@api_view(['POST'])
@permission_classes((AllowAny,))
def deleteUserFun(request):
    user_id = request.data.get('id')
    try:
        user = AdminUser.objects.get(id=user_id)
        user.isDelete = "Yes"
        user.save()
        return JsonResponse({'status': True, 'message': 'User deleted successfully'})
    except AdminUser.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'User not found'}, status=404)

# @api_view(['GET'])
# @permission_classes((AllowAny,))
# def permissionListFun(request):
#     modules = SidebarModule.objects.filter(isDelete="No").order_by('order')
#     grouped_perms = {}
#     for m in modules:
#         submodules = SidebarSubModule.objects.filter(module=m, isDelete="No").order_by('order')
#         if submodules.exists():
#             grouped_perms[m.name] = []
#             for sm in submodules:
#                 grouped_perms[m.name].append({
#                     'id': sm.id,
#                     'name': sm.name,
#                     'codename': sm.id_attr # Using id_attr as codename for frontend compat
#                 })
#     return JsonResponse({'status': True, 'permissionModules': grouped_perms})

@api_view(['GET'])
@permission_classes((AllowAny,))
def permissionListFun(request):
    modules = SidebarModule.objects.filter(isDelete="No").order_by('order')
    grouped_perms = {}
    for m in modules:
        submodules = SidebarSubModule.objects.filter(module=m, isDelete="No").order_by('order')
        if submodules.exists():
            grouped_perms[m.name] = []
            for sm in submodules:
                grouped_perms[m.name].append({
                    'id': sm.id,
                    'name': sm.name,
                    'codename': sm.id_attr
                })
        else:
            # Return module itself as single item so frontend can use real codename
            grouped_perms[m.name] = [{
                'id': m.id,
                'name': m.name,
                'codename': m.id_attr  # e.g. "dashboards", "general_details"
            }]
    return JsonResponse({'status': True, 'permissionModules': grouped_perms})


@api_view(['GET'])
@permission_classes((AllowAny,))
def roleListFun(request):
    roles = AdminRole.objects.filter(isDelete="No")
    role_list = []
    for role in roles:
        role_list.append({
            'id': role.id,
            'name': role.name,
        })
    return JsonResponse({'status': True, 'roleList': role_list})

@api_view(['POST'])
@permission_classes((AllowAny,))
@parser_classes([MultiPartParser, FormParser])
def addRoleFun(request):
    name = request.data.get('name')
    if not name:
        return JsonResponse({'status': False, 'message': 'Role name is required'}, status=400)
    if AdminRole.objects.filter(name=name, isDelete="No").exists():
        return JsonResponse({'status': False, 'message': 'Role already exists'}, status=400)
    role = AdminRole.objects.create(name=name)
    return JsonResponse({'status': True, 'message': 'Role created successfully', 'role': {'id': role.id, 'name': role.name}})

@api_view(['POST'])
@permission_classes((AllowAny,))
def deleteRoleFun(request):
    role_id = request.data.get('id')
    try:
        role = AdminRole.objects.get(id=role_id)
        role.isDelete = "Yes"
        role.save()

        return JsonResponse({'status': True, 'message': 'Role deleted successfully'})
    except AdminRole.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'Role not found'}, status=404)

# @api_view(['GET'])
# @permission_classes((AllowAny,))
# def getRolePermissionsFun(request):
#     role_id = request.query_params.get('id')
#     try:
#         role = AdminRole.objects.get(id=role_id)
#         return JsonResponse({
#             'status': True, 
#             'role_name': role.name, 
#             'detailed_permissions': role.detailed_permissions,
#             'permissions': [p.id_attr for p in role.permissions.all()] # For compat
#         })
#     except AdminRole.DoesNotExist:
#         return JsonResponse({'status': False, 'message': 'Role not found'}, status=404)

@api_view(['GET'])
@permission_classes((AllowAny,))
def getRolePermissionsFun(request):
    role_id = request.query_params.get('id')
    try:
        role = AdminRole.objects.get(id=role_id)
        return JsonResponse({
            'status': True,
            'role_name': role.name,
            'detailed_permissions': role.detailed_permissions
        })
    except AdminRole.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'Role not found'}, status=404)

# @api_view(['POST'])
# @permission_classes((AllowAny,))
# def updateRolePermissionsFun(request):
#     role_id = request.data.get('id')
#     detailed_permissions = request.data.get('detailed_permissions', {})
#     try:
#         role = AdminRole.objects.get(id=role_id)
#         role.detailed_permissions = detailed_permissions
#         # Sync ManyToMany
#         permission_ids = list(detailed_permissions.keys())
#         permissions = SidebarSubModule.objects.filter(id_attr__in=permission_ids)
#         role.permissions.set(permissions)
#         role.save()
#         return JsonResponse({'status': True, 'message': 'Role permissions updated successfully'})
#     except AdminRole.DoesNotExist:
#         return JsonResponse({'status': False, 'message': 'Role not found'}, status=404)

@api_view(['POST'])
@permission_classes((AllowAny,))
def updateRolePermissionsFun(request):
    role_id = request.data.get('id')
    detailed_permissions = request.data.get('detailed_permissions', {})
    try:
        role = AdminRole.objects.get(id=role_id)
        role.detailed_permissions = detailed_permissions
        role.save()
        return JsonResponse({'status': True, 'message': 'Role permissions updated successfully'})
    except AdminRole.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'Role not found'}, status=404)


# from django.contrib.auth.hashers import make_password, check_password
# from Myadmin.models import SidebarModule, SidebarSubModule, AdminUser, AdminRole

# @api_view(['POST'])
# @permission_classes((AllowAny,))
# def customLoginFun(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     try:
#         user = AdminUser.objects.get(email=email, isDelete="No")
#         if check_password(password, user.password):
#             # Merge detailed permissions
#             detailed = user.detailed_permissions.copy()
#             if user.role:
#                 for k, v in user.role.detailed_permissions.items():
#                     if k in detailed:
#                         detailed[k] = list(set(detailed[k] + v))
#                     else:
#                         detailed[k] = v
            
#             return JsonResponse({
#                 'status': True,
#                 'user': {
#                     'id': user.id,
#                     'name': user.name,
#                     'username': user.username,
#                     'email': user.email,
#                     'role': user.role.name if user.role else "No Role"
#                 },
#                 'detailed_permissions': detailed,
#                 'permissions': list(detailed.keys()) # Array of keys for legacy check
#             })
#         else:
#             return JsonResponse({'status': False, 'message': 'Invalid password'}, status=401)
#     except AdminUser.DoesNotExist:
#         return JsonResponse({'status': False, 'message': 'User not found'}, status=404)

# @api_view(['POST'])
# @permission_classes((AllowAny,))
# def customLoginFun(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     try:
#         user = AdminUser.objects.get(email=email, isDelete="No")
#         if check_password(password, user.password):
#             # Start with role permissions as base
#             detailed = {}
#             if user.role:
#                 detailed = user.role.detailed_permissions.copy()

#             # User-level permissions override/extend role permissions
#             for k, v in user.detailed_permissions.items():
#                 if k in detailed:
#                     detailed[k] = list(set(detailed[k] + v))
#                 else:
#                     detailed[k] = v

#             return JsonResponse({
#                 'status': True,
#                 'user': {
#                     'id': user.id,
#                     'name': user.name,
#                     'username': user.username,
#                     'email': user.email,
#                     'role': user.role.name if user.role else "No Role"
#                 },
#                 'detailed_permissions': detailed
#             })
#         else:
#             return JsonResponse({'status': False, 'message': 'Invalid password'}, status=401)
#     except AdminUser.DoesNotExist:
#         return JsonResponse({'status': False, 'message': 'User not found'}, status=404)

@api_view(['POST'])
@permission_classes((AllowAny,))
def customLoginFun(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = AdminUser.objects.get(email=email, isDelete="No")
        if check_password(password, user.password):
            otp = str(random.randint(100000, 999999))
            user.otp_code = otp
            user.otp_created_at = datetime.now()
            user.save(update_fields=['otp_code', 'otp_created_at'])

            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #333;">Admin Panel Login OTP</h2>
                <p style="color: #555;">Use the OTP below to complete your login. It expires in <strong>10 minutes</strong>.</p>
                <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1a73e8; margin: 24px 0;">{otp}</div>
                <p style="color: #999; font-size: 12px;">If you did not request this, please ignore this email.</p>
            </div>
            """
            text_content = f"Your admin panel login OTP is: {otp}. It expires in 10 minutes."
            msg = EmailMultiAlternatives(
                subject="Admin Panel Login OTP",
                body=text_content,
                from_email='int.web@iq-hub.com',
                to=[user.email],
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            return JsonResponse({'status': True, 'otp_sent': True, 'user_id': user.id})
        else:
            return JsonResponse({'status': False, 'message': 'Invalid password'}, status=401)
    except AdminUser.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'User not found'}, status=404)


@api_view(['POST'])
@permission_classes((AllowAny,))
def verifyOTPFun(request):
    user_id = request.data.get('user_id')
    otp = request.data.get('otp')

    if not user_id or not otp:
        return JsonResponse({'status': False, 'message': 'user_id and otp are required'}, status=400)

    try:
        user = AdminUser.objects.get(id=user_id, isDelete="No")
    except AdminUser.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'User not found'}, status=404)

    if not user.otp_code or not user.otp_created_at:
        return JsonResponse({'status': False, 'message': 'No OTP requested. Please login again.'}, status=400)

    expiry = user.otp_created_at + timedelta(minutes=10)
    if datetime.now() > expiry:
        user.otp_code = None
        user.otp_created_at = None
        user.save(update_fields=['otp_code', 'otp_created_at'])
        return JsonResponse({'status': False, 'message': 'OTP has expired. Please login again.'}, status=400)

    if user.otp_code != str(otp):
        return JsonResponse({'status': False, 'message': 'Invalid OTP'}, status=400)

    user.otp_code = None
    user.otp_created_at = None
    user.save(update_fields=['otp_code', 'otp_created_at'])

    detailed = {}
    if user.role:
        detailed = user.role.detailed_permissions.copy()

    for k, v in user.detailed_permissions.items():
        if k in detailed:
            detailed[k] = list(set(detailed[k] + v))
        else:
            detailed[k] = v

    all_submodules = SidebarSubModule.objects.filter(isDelete="No")
    all_modules = SidebarModule.objects.filter(isDelete="No")

    system_keys = set()
    for sm in all_submodules:
        if sm.id_attr:
            system_keys.add(sm.id_attr)
    for m in all_modules:
        if m.id_attr and not m.submodules.filter(isDelete="No").exists():
            system_keys.add(m.id_attr)

    for key in system_keys:
        if key not in detailed:
            detailed[key] = []

    return JsonResponse({
        'status': True,
        'user': {
            'id': user.id,
            'name': user.name,
            'username': user.username,
            'email': user.email,
            'role': user.role.name if user.role else "No Role"
        },
        'detailed_permissions': detailed
    })

@api_view(['GET'])
@permission_classes((AllowAny,))
def getNavbarDataFun(request):
    modules = SidebarModule.objects.filter(isDelete="No").order_by('order')
    navbarData = []
    for m in modules:
        submodules = SidebarSubModule.objects.filter(module=m, isDelete="No").order_by('order')
        sub_list = []
        for sm in submodules:
            sub_list.append({
                'id': sm.id_attr,
                'label': sm.name,
                'link': sm.link,
                'parentId': m.name.lower()
            })
        navbarData.append({
            'id': m.id_attr or m.name.lower(),
            'label': m.name,
            'icon': m.icon,
            'link': m.link if not sub_list else None,  # only for standalone modules
            'subItems': sub_list
        })
    return JsonResponse({'status': True, 'navbarData': navbarData})

#------------------- Api For Add Slide Share-------------------#
@api_view(['POST'])
def add_slideShare(request):
    response = request.data
    check_db = eventSlideShares()

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'author' in request.POST:
        check_db.author = response['author']

    if 'authorCompany' in request.POST:
        check_db.authorCompany = response['authorCompany']

    if 'heading' in request.POST:
        check_db.heading = response['heading']

    if 'pptImage' in request.POST:
        check_db.pptImage = response['pptImage']

    if 'pptLink' in request.POST:
        check_db.pptLink = response['pptLink']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Slide Share-------------------#
@api_view(['POST'])
def edit_slideShare(request):
    response = request.data
    check_db = eventSlideShares.objects.get(id=response['id'])

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'author' in request.POST:
        check_db.author = response['author']

    if 'authorCompany' in request.POST:
        check_db.authorCompany = response['authorCompany']

    if 'heading' in request.POST:
        check_db.heading = response['heading']

    if 'pptImage' in request.POST:
        check_db.pptImage = response['pptImage']

    if 'pptLink' in request.POST:
        check_db.pptLink = response['pptLink']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Slide Share -------------------#
@api_view(['POST'])
def delete_slideShare(request):
    response = request.data
    check_db = eventSlideShares.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Slide Share List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def slideShareListFun(request):
    slideShares_Data = eventSlideShares.objects.all().filter(isDelete='No')
    slideSharesOptions = []
    for slideShare in slideShares_Data:
        related_project_year = {}
        if slideShare.projectId != None:
            related_project_year ={
                'id':slideShare.projectId.id,
                'projectYear':slideShare.projectId.projectYear,
            }
        x={
            'id':slideShare.id,
            'relatedProjectYear':related_project_year,
            'author':slideShare.author,
            'authorCompany':slideShare.authorCompany,
            'heading':slideShare.heading,
            'pptImage':slideShare.pptImage,
            'pptLink':slideShare.pptLink,
            'projectYear':slideShare.projectYear,
            'created_at': slideShare.created_at,
            'updated_at': slideShare.updated_at,
            'created_by': slideShare.created_by,
            'updated_by': slideShare.updated_by,
        }
        slideSharesOptions.append(x) 
    return JsonResponse({'slideShares': slideSharesOptions, 'status': True})

#------------------- Api For Add Slide Share Attandee-------------------#
@api_view(['POST'])
def add_slideShare_attandee(request):
    response = request.data
    check_db = eventSlideSharesAttandees()

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'companyName' in request.POST:
        check_db.companyName = response['companyName']

    if 'delegateName' in request.POST:
        check_db.delegateName = response['delegateName']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Slide Share Attandee-------------------#
@api_view(['POST'])
def edit_slideShare_attandee(request):
    response = request.data
    check_db = eventSlideSharesAttandees.objects.get(id=response['id'])

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'companyName' in request.POST:
        check_db.companyName = response['companyName']

    if 'delegateName' in request.POST:
        check_db.delegateName = response['delegateName']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Slide Share Attandee-------------------#
@api_view(['POST'])
def delete_slideShare_attandee(request):
    response = request.data
    check_db = eventSlideSharesAttandees.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Slide Share Attandee List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def slideShareAttandeeListFun(request):
    slideSharesAttandee_Data = eventSlideSharesAttandees.objects.all().filter(isDelete='No')
    slideSharesAttandees = []
    for attandee in slideSharesAttandee_Data:
        related_project_year = {}
        if attandee.projectId != None:
            related_project_year ={
                'id':attandee.projectId.id,
                'projectYear':attandee.projectId.projectYear,
            }
        x={
            'id':attandee.id,
            'relatedProjectYear':related_project_year,
            'companyName':attandee.companyName,
            'delegateName':attandee.delegateName,
            'projectYear':attandee.projectYear,
            'created_at': attandee.created_at,
            'updated_at': attandee.updated_at,
            'created_by': attandee.created_by,
            'updated_by': attandee.updated_by,
        }
        slideSharesAttandees.append(x) 
    return JsonResponse({'slideSharesAttandees': slideSharesAttandees, 'status': True})

#------------------- Api For Add Slide Share Access-------------------#
@api_view(['POST'])
def add_slideShare_access(request):
    response = request.data
    check_db = slideSharesAccessPersons()

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'email' in request.POST:
        check_db.email = response['email']

    if 'eventPassword' in request.POST:
        check_db.eventPassword = response['eventPassword']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Slide Share Access-------------------#
@api_view(['POST'])
def delete_slideShare_access(request):
    response = request.data
    check_db = slideSharesAccessPersons.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Slide Share Access List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def slideShareAccessListFun(request):
    slideSharesAccess_Data = slideSharesAccessPersons.objects.all().filter(isDelete='No')
    slideSharesAccess = []
    for a in slideSharesAccess_Data:
        related_project_year = {}
        if a.projectId != None:
            related_project_year ={
                'id':a.projectId.id,
                'projectYear':a.projectId.projectYear,
            }
        x={
            'id':a.id,
            'relatedProjectYear':related_project_year,
            'email':a.email,
            # 'eventPassword':a.eventPassword,
            # 'projectYear':a.projectYear,
            'created_at': a.created_at,
            'updated_at': a.updated_at,
            'created_by': a.created_by,
            'updated_by': a.updated_by,
        }
        slideSharesAccess.append(x) 
    return JsonResponse({'slideSharesAccess': slideSharesAccess, 'status': True})

#------------------- Api For Edit Slide Share Access-------------------#
@api_view(['POST'])
def edit_slideShare_access(request):
    response = request.data
    check_db = slideSharesAccessPersons.objects.get(id=response['id'])

    if 'projectId' in request.POST:
        projectData = eventProject.objects.get(id=response['projectId'])
        check_db.projectId = projectData

    if 'email' in request.POST:
        check_db.email = response['email']

    if 'eventPassword' in request.POST:
        check_db.eventPassword = response['eventPassword']

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

class LoginRateThrottle(AnonRateThrottle):
    rate = '5/min'

#------------------- Api For Secure Login of Slide Share-------------------#
@api_view(['POST'])
@authentication_classes([]) 
@permission_classes((AllowAny,))
@throttle_classes([LoginRateThrottle])
def secure_login_slideShare(request):
    response = request.data
    email = response['email']
    eventPassword = response['eventPassword']
    projectYear = response['projectYear']

    try:
        project = eventProject.objects.get(projectYear=projectYear)
    except eventProject.DoesNotExist:
        return JsonResponse({'status': False, "message": "Invalid Project Details"})

    # ✅ Compare eventPassword against project.password
    if project.password != eventPassword:
        return JsonResponse({'status': False, "message": "Invalid Credentials"})

    try:
        # ✅ Now just find the attendee by email and project (no eventPassword here)
        attendee = slideSharesAccessPersons.objects.get(email=email, projectId=project)
    except slideSharesAccessPersons.DoesNotExist:
        return JsonResponse({'status': False, "message": "Invalid Credentials"})

    now = datetime.utcnow()
    expires_at = now + timedelta(hours=2)

    payload = {
        "attendee_id": attendee.id,
        "email":       attendee.email,
        "year":        attendee.projectId.projectYear,
        "iat":         int(now.timestamp()),
        "exp":         int(expires_at.timestamp()),
    }

    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    return JsonResponse({
        'status': True,
        "message": "Login successful.",
        "token": token,
        "email": attendee.email,
        "expires_at": expires_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "token_type": "Bearer",
        "success": True,
    })

# def generate_invoice_number(request):
#     while True:
#         number = random.randint(1000, 9999)
#         invoice_no = f"LDZ26AUS-{number}"
        
#         delegate_exists = delegateTransectionData.objects.filter(invoiceNo=invoice_no).exists()
#         sponsor_exists = sponsorCompanyTransectionData.objects.filter(invoiceNo=invoice_no).exists()
        
#         if not delegate_exists and not sponsor_exists:
#             return JsonResponse({"invoiceNo": invoice_no})

#---------------------------- Api For Get Pay Online Transection List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def payOnlineTransectionListFun(request):
    payOnlineTransection_Data = payOnlineTransectionData.objects.all().filter(isDelete='No')
    payOnlineTransections = []
    for tr in payOnlineTransection_Data:
        x={
            'id':tr.id,
            'invoiceNo':tr.invoiceNo,
            'totalPayAmount':tr.totalPayAmount,
            'email':tr.email,
            'transectionId':tr.transectionId,
            'created_at': tr.created_at,
            'updated_at': tr.updated_at,
            'created_by': tr.created_by,
            'updated_by': tr.updated_by,
        }
        payOnlineTransections.append(x) 
    return JsonResponse({'payOnlineTransections': payOnlineTransections, 'status': True})

#------------------- Api For Add Pay Online Request-------------------#
@api_view(['POST'])
def add_payOnline_request(request):
    response = request.data
    check_db = payOnlineTransectionData()

    if 'invoiceNo' in request.POST:
        check_db.invoiceNo = response['invoiceNo']

    if 'totalPayAmount' in request.POST:
        check_db.totalPayAmount = response['totalPayAmount']

    if 'email' in request.POST:
        check_db.email = response['email']

    if 'transectionId' in request.POST:
        check_db.transectionId = response['transectionId']

    if 'transectionType' in request.POST:
        check_db.transectionType = response['transectionType']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Verify Email Domain -------------------#
@api_view(['POST'])
def verify_email_domain(request):
    response = request.data
    email = response['email']
    domain = email.split('@')[-1].lower()

    # Check if domain is blocked
    is_blocked = blockedEmailDomains.objects.filter(domainName__iexact=domain).filter(isDelete='No').exists()

    if is_blocked:
        return JsonResponse({
            'status': False,
            'message': f"Emails from '{domain}' are not allowed."
        })

    return JsonResponse({'status': True, 'message': 'Email is valid'})

#------------------- Api For Add Block Domain-------------------#
@api_view(['POST'])
def add_blockDomain(request):
    response = request.data
    check_db = blockedEmailDomains()

    if 'domainName' in request.POST:
        check_db.domainName = response['domainName']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Block Domain-------------------#
@api_view(['POST'])
def edit_blockDomain(request):
    response = request.data
    check_db = blockedEmailDomains.objects.get(id=response['id'])

    if 'domainName' in request.POST:
        check_db.domainName = response['domainName']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Block Domain-------------------#
@api_view(['POST'])
def delete_blockDomain(request):
    response = request.data
    check_db = blockedEmailDomains.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Block Domain List ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def blockDomainListFun(request):
    blockDomain_Data = blockedEmailDomains.objects.all().filter(isDelete='No')
    blockDomains = []
    for blockDomain in blockDomain_Data:
        x={
            'id':blockDomain.id,
            'domainName':blockDomain.domainName,
            'created_at': blockDomain.created_at,
            'updated_at': blockDomain.updated_at,
            'created_by': blockDomain.created_by,
            'updated_by': blockDomain.updated_by,
        }
        blockDomains.append(x) 
    return JsonResponse({'blockDomains': blockDomains, 'status': True})

#---------------------------- Api For Page SEO Settings ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def pageSeoListFun(request):
    seo_list = pageSeoSettings.objects.filter(isDelete='No').order_by('pageName')
    data = []
    for seo in seo_list:
        data.append({
            'id': seo.id,
            'pageName': seo.pageName,
            'pageMetaTitle': seo.pageMetaTitle,
            'pageMetaDescription': seo.pageMetaDescription,
            'pageOgImage': seo.pageOgImage,
            'created_at': seo.created_at,
            'updated_at': seo.updated_at,
        })
    return JsonResponse({'pageSeoSettings': data, 'status': True})

@permission_classes((AllowAny,))
@api_view(['POST'])
def add_pageSeo(request):
    response = request.data
    pageName = response.get('pageName', '')
    pageMetaTitle = response.get('pageMetaTitle', '')
    pageMetaDescription = response.get('pageMetaDescription', '')
    pageOgImage = response.get('pageOgImage', '')
    obj = pageSeoSettings(
        pageName=pageName,
        pageMetaTitle=pageMetaTitle,
        pageMetaDescription=pageMetaDescription,
        pageOgImage=pageOgImage,
        created_by='Admin',
        updated_by='Admin',
    )
    obj.save()
    return JsonResponse({'status': True, 'message': 'Page SEO added successfully', 'id': obj.id})

@permission_classes((AllowAny,))
@api_view(['PATCH'])
def edit_pageSeo(request):
    response = request.data
    seo_id = response.get('id')
    try:
        obj = pageSeoSettings.objects.get(id=seo_id, isDelete='No')
    except pageSeoSettings.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'Record not found'})
    if 'pageName' in response:
        obj.pageName = response['pageName']
    if 'pageMetaTitle' in response:
        obj.pageMetaTitle = response['pageMetaTitle']
    if 'pageMetaDescription' in response:
        obj.pageMetaDescription = response['pageMetaDescription']
    if 'pageOgImage' in response:
        obj.pageOgImage = response['pageOgImage']
    obj.updated_by = 'Admin'
    obj.save()
    return JsonResponse({'status': True, 'message': 'Page SEO updated successfully'})

@permission_classes((AllowAny,))
@api_view(['DELETE'])
def delete_pageSeo(request):
    seo_id = request.data.get('id')
    try:
        obj = pageSeoSettings.objects.get(id=seo_id)
        obj.isDelete = 'Yes'
        obj.save()
        return JsonResponse({'status': True, 'message': 'Record deleted successfully'})
    except pageSeoSettings.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'Record not found'})

@api_view(['POST'])
def save_nav_checked_status(request):
    try:
        # FormData sends JSON as a plain string — must parse it first
        main_list = json.loads(request.data.get('mainCategories', '[]'))
        sub_list  = json.loads(request.data.get('subCategories',  '[]'))

        for item in main_list:
            obj = homePageNavMainCategories.objects.get(id=item['id'])
            obj.isChecked  = item['isChecked']
            obj.updated_by = "Admin"
            obj.save()

        for item in sub_list:
            obj = homePageNavSubCategories.objects.get(id=item['id'])
            obj.isChecked  = item['isChecked']
            obj.updated_by = "Admin"
            obj.save()

        return JsonResponse({'status': True, 'message': 'Checked status saved successfully'})

    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})
    
#------------------- Api For Add Footer Options  -------------------#
@api_view(['POST'])
def add_footerOption(request):
    response = request.data
    check_db = footerOptions()

    if 'footerOptionsName' in request.POST:
        check_db.footerOptionsName = response['footerOptionsName']

    if 'footerOptionsPath' in request.POST:
        check_db.footerOptionsPath = response['footerOptionsPath']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Footer Options-------------------#
@api_view(['POST'])
def edit_footerOption(request):
    response = request.data
    check_db = footerOptions.objects.get(id=response['id'])

    if 'footerOptionsName' in request.POST:
        check_db.footerOptionsName = response['footerOptionsName']

    if 'footerOptionsPath' in request.POST:
        check_db.footerOptionsPath = response['footerOptionsPath']
 
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Footer Options -------------------#
@api_view(['POST'])
def delete_footerOption(request):
    response = request.data
    check_db = footerOptions.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For Get Footer Options ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def footerOptionsFun(request):
    footerOption_list = footerOptions.objects.all().filter(isDelete='No').order_by('id')
    footerOptionsArr = []
    for op in footerOption_list:
        x={
            'id':op.id,
            'footerOptionsName':op.footerOptionsName,
            'footerOptionsPath':op.footerOptionsPath,
            'isChecked':op.isChecked,
            'created_at': op.created_at,
            'updated_at': op.updated_at,
            'created_by': op.created_by,
            'updated_by': op.updated_by,
        }
        footerOptionsArr.append(x)
    return JsonResponse({'footerOptions': footerOptionsArr, 'status': True})

#------------------- Api For Save Footer Options isChecked Status -------------------#
@api_view(['POST'])
def save_footer_checked_status(request):
    try:
        footer_list = json.loads(request.data.get('footerOptions', '[]'))

        for item in footer_list:
            obj = footerOptions.objects.get(id=item['id'])
            obj.isChecked  = item['isChecked']
            obj.updated_by = "Admin"
            obj.save()

        return JsonResponse({'status': True, 'message': 'Footer checked status saved successfully'})

    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})

@api_view(['GET'])
def get_to_emails(request):
    try:
        obj = toEmails.objects.filter(isDelete="No").first()
        if obj:
            return Response({
                "status": True,
                "toemails": obj.toemails,
                "id": obj.id,
                "created_at": obj.created_at,
                "updated_at": obj.updated_at

            })
        return Response({"status": True, "toemails": "", "id": None})
    except Exception as e:
        return Response({"status": False, "message": str(e)}, status=500)
    
@api_view(['POST'])
def save_to_emails(request):
    try:
        emails = request.data.get("toemails", "")
        updated_by = request.data.get("updated_by", "Admin")
        obj_id = request.data.get("id", None)

        if obj_id:
            obj = toEmails.objects.filter(id=obj_id, isDelete="No").first()
            if obj:
                obj.toemails = emails
                obj.updated_by = updated_by
                obj.save()
                return Response({"status": True, "message": "Emails updated successfully.", "id": obj.id})

        # Create new if not found
        new_obj = toEmails.objects.create(
            toemails=emails,
            created_by=updated_by,
            updated_by=updated_by,
        )
        return Response({"status": True, "message": "Emails saved successfully.", "id": new_obj.id})

    except Exception as e:
        return Response({"status": False, "message": str(e)}, status=500)

#------------------- Api For Add Agenda Subscriber  -------------------#
@api_view(['POST'])
def add_agendaSubscriber(request):
    response = request.data
    check_db = agendaSubscriber()

    # ✅ Fixed — use response (request.data) instead of request.POST
    if 'subscriber' in response:
        check_db.subscriber = response['subscriber']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For List Agenda Subscriber ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def agendaSubscriberListFun(request):
    agendaSubscriber_list = agendaSubscriber.objects.all().filter(isDelete='No')
    agendaSubscriberArr = []
    for op in agendaSubscriber_list:
        x={
            'id':op.id,
            'subscriber':op.subscriber,
            'created_at': op.created_at,
            'updated_at': op.updated_at,        
            'created_by': op.created_by,
            'updated_by': op.updated_by,
        }
        agendaSubscriberArr.append(x)
    return JsonResponse({'agendaSubscribers': agendaSubscriberArr, 'status': True})

#------------------- Api For Add Agenda Subscriber  -------------------#
@api_view(['POST'])
def add_calenderSubscriber(request):
    response = request.data
    check_db = calenderSubscriber()

    if 'calenderSubscriber' in response:
        check_db.calenderSubscriber = response['calenderSubscriber']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For List Agenda Subscriber ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def calenderSubscriberListFun(request):
    calenderSubscriber_list = calenderSubscriber.objects.all().filter(isDelete='No')
    calenderSubscriberArr = []
    for op in calenderSubscriber_list:
        x={
            'id':op.id,
            'calenderSubscriber':op.calenderSubscriber,
            'created_at': op.created_at,
            'updated_at': op.updated_at,        
            'created_by': op.created_by,
            'updated_by': op.updated_by,
        }
        calenderSubscriberArr.append(x)
    return JsonResponse({'calenderSubscribers': calenderSubscriberArr, 'status': True})

#---------------------------- Api For get List of Spnsor Offer Coupons  ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorOfferCouponsFun(request):
    sponsorOfferCoupons_list = sponsorOfferCoupon.objects.all().filter(isDelete='No')
    sponsorOfferCouponsList = []
    for coupon in sponsorOfferCoupons_list:  
        x={
            'id':coupon.id,
            'couponCode':coupon.couponCode,
            'discountType':coupon.discountType,
            'discountAmount':coupon.discountAmount,
            'couponFor':coupon.couponFor,
            'eventSpecialWord':coupon.eventSpecialWord,
            'created_at': coupon.created_at,
            'updated_at': coupon.updated_at,
            'created_by': coupon.created_by,
            'updated_by': coupon.updated_by,
        }
        sponsorOfferCouponsList.append(x)
    return JsonResponse({'sponsorOfferCoupons': sponsorOfferCouponsList, 'status': True})

#------------------- Api For Add Offer Coupon-------------------#
@api_view(['POST'])
def add_sponsorOfferCoupon(request):
    response = request.data
    check_db = sponsorOfferCoupon()

    if 'couponCode' in request.POST:
        check_db.couponCode = response['couponCode']

    if 'discountType' in request.POST:
        check_db.discountType = response['discountType']

    if 'discountAmount' in request.POST:
        check_db.discountAmount = response['discountAmount']

    if 'couponFor' in request.POST:
        check_db.couponFor = response['couponFor']

    if 'eventSpecialWord' in request.POST:
        check_db.eventSpecialWord = response['eventSpecialWord']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Offer Coupon-------------------#
@api_view(['POST'])
def edit_sponsorOfferCoupon(request):
    response = request.data
    check_db = sponsorOfferCoupon.objects.get(id=response['id'])

    if 'couponCode' in request.POST:
        check_db.couponCode = response['couponCode']

    if 'discountType' in request.POST:
        check_db.discountType = response['discountType']

    if 'discountAmount' in request.POST:
        check_db.discountAmount = response['discountAmount']

    if 'couponFor' in request.POST:
        check_db.couponFor = response['couponFor']

    if 'eventSpecialWord' in request.POST:
        check_db.eventSpecialWord = response['eventSpecialWord']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Offer Coupon-------------------#
@api_view(['POST'])
def delete_sponsorOfferCoupon(request):
    response = request.data
    check_db = sponsorOfferCoupon.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For get Offer Coupon by Code   ----------------------------#
@api_view(['POST'])
def sponsorOfferCouponByCodeFun(request):
    response = request.data
    couponCode = response['couponCode']
    print("===================couponCode", couponCode)

    offerCoupons_list = sponsorOfferCoupon.objects.filter(
        couponCode=couponCode,
        isDelete='No'
    ).all()

    print("===================offerCoupons_list", offerCoupons_list)
    print("===================offerCoupons_list", len(offerCoupons_list))

    if offerCoupons_list.exists():  # ✅ check queryset, not empty list
        offerCouponsList = []
        for coupon in offerCoupons_list:  
            x = {
                'id': coupon.id,
                'couponCode': coupon.couponCode,
                'discountType': coupon.discountType,
                'discountAmount': coupon.discountAmount,
                'couponFor': coupon.couponFor,
                'eventSpecialWord': coupon.eventSpecialWord,
                'created_at': coupon.created_at,
                'updated_at': coupon.updated_at,
                'created_by': coupon.created_by,
                'updated_by': coupon.updated_by,
            }
            offerCouponsList.append(x)
        return JsonResponse({'offerCoupons': offerCouponsList, 'status': True})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Coupon Code'})
    
#---------------------------- Api For Get Event Projects ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def eventProjectListFun(request):
    projects_Data = eventProject.objects.all().filter(isDelete='No')
    projectList = []
    for pr in projects_Data:
        x={
            'id':pr.id,
            'projectYear':pr.projectYear,
            'password':pr.password,
            'created_at': pr.created_at,
            'updated_at': pr.updated_at,
            'created_by': pr.created_by,
            'updated_by': pr.updated_by,
        }
        projectList.append(x) 
    return JsonResponse({'eventProjects': projectList, 'status': True})

#------------------- Api For Add Event Projects-------------------#
@api_view(['POST'])
def add_eventProject(request):
    response = request.data
    check_db = eventProject()

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']

    if 'password' in request.POST:
        check_db.password = response['password']
 
    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Event Projects-------------------#
@api_view(['POST'])
def edit_eventProject(request):
    response = request.data
    check_db = eventProject.objects.get(id=response['id'])

    if 'projectYear' in request.POST:
        check_db.projectYear = response['projectYear']

    if 'password' in request.POST:
        check_db.password = response['password']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Event Projects -------------------#
@api_view(['POST'])
def delete_eventProject(request):
    response = request.data
    check_db = eventProject.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#---------------------------- Api For List Sponser Cards ----------------------------#
@permission_classes((AllowAny,))
@api_view(['GET'])
def sponsorCardsListFun(request):
    cards_list = sponsorCards.objects.all().filter(isDelete='No')
    cardsData = []
    for card in cards_list:
        x={
            'id':card.id,
            'title':card.title,
            'price':card.price,
            'description':card.description,
            'created_at': card.created_at,
            'updated_at': card.updated_at,
            'created_by': card.created_by,
            'updated_by': card.updated_by,
        }
        cardsData.append(x)
    return JsonResponse({'sponsorCardsList': cardsData, 'status': True})

#------------------- Api For Add Sponsor Card-------------------#
@api_view(['POST'])
def add_sponsorCard(request):
    response = request.data
    check_db = sponsorCards()

    if 'title' in request.POST:
        check_db.title = response['title']

    if 'price' in request.POST:
        check_db.price = response['price']

    if 'description' in request.POST:
        check_db.description = response['description']

    check_db.created_by = "Admin"
    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Edit Sponsor Cards-------------------#
@api_view(['POST'])
def edit_sponsorCard(request):
    response = request.data
    check_db = sponsorCards.objects.get(id=response['id'])

    if 'title' in request.POST:
        check_db.title = response['title']

    if 'price' in request.POST:
        check_db.price = response['price']

    if 'description' in request.POST:
        check_db.description = response['description']

    check_db.updated_by = "Admin"
    check_db.save()

    return JsonResponse({'status': True, "message": "Record Updated Successfully"})

#------------------- Api For Delete Sponsor Cards -------------------#
@api_view(['POST'])
def delete_sponsorCard(request):
    response = request.data
    check_db = sponsorCards.objects.get(id=response['id'])
    check_db.isDelete = response['isDelete']
    check_db.save()
    return JsonResponse({'status': True, "message": "Record Updated Successfully"})


#------------------- Api For Genrate Invoice No. -------------------#
def generate_invoice_number(request):
    event = eventDetails.objects.first()
    
    if not event:
        return JsonResponse({"error": "Event not found"}, status=404)
    
    short_code = event.eventShortCode.upper()
    year_short = event.eventYear[-2:]   # "2026" → "26"
    city_code = event.eventCityShortCode.upper()
    
    prefix = f"{short_code}{year_short}{city_code}"  # e.g. "LDZ26AUS"

    with transaction.atomic():
        last = InvoiceNumberTracker.objects.filter(
            invoiceNo__startswith=prefix + "-"
        ).order_by('-id').first()

        if last:
            last_number = int(last.invoiceNo.split("-")[-1])
        else:
            last_number = 2500  # series starts at 2501

        next_number = last_number + 1
        invoice_no = f"{prefix}-{next_number}"

        InvoiceNumberTracker.objects.create(invoiceNo=invoice_no)

    return JsonResponse({"invoiceNo": invoice_no})