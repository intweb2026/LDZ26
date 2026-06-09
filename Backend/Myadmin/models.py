from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.hashers import make_password
# Create your models here.
class homePageNavLogoData(models.Model):
    whiteLogoLink = models.TextField(null=True,blank=True)
    blackLogoLink = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class homePageNavMainCategories(models.Model):
    navMainCategoryName = models.CharField(default="",max_length=50,null=True, blank=True)
    navMainCategoryPath = models.CharField(default="",max_length=50,null=True, blank=True)
    isChecked = models.CharField(default="No", max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class homePageNavSubCategories(models.Model):
    navMainCategoryId = models.ForeignKey(homePageNavMainCategories,default='',on_delete=CASCADE,null=True,blank=True)
    navSubCategoryName = models.CharField(default="",max_length=50,null=True, blank=True)
    navSubCategoryPath = models.CharField(default="",max_length=50,null=True, blank=True)
    isChecked = models.CharField(default="No", max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class videoSectionUserOptions(models.Model):
    videoSectionUserOptionName = models.CharField(default="",max_length=100,null=True, blank=True)
    videoSectionUserOptionShortDescription = models.CharField(default="",max_length=150,null=True, blank=True)
    videoSectionUserOptionOrderNo = models.CharField(default="",max_length=100,null=True, blank=True)
    videoSectionUserOptionArrowIcon = models.CharField(default="",max_length=100,null=True, blank=True)
    videoSectionUserOptionRedirectRoute = models.CharField(default="",max_length=100,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class homePageVideoSectionInput (models.Model):
    videoLinkmp4 = models.CharField(default="",max_length=150,null=True, blank=True)
    videoLinkwebm = models.CharField(default="",max_length=150,null=True, blank=True)
    eventDetailBackImage = models.CharField(default="",max_length=150,null=True, blank=True)
    videoReplaceImage = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)
    eventStataticsBackImage = models.CharField(default="",max_length=150,null=True, blank=True)
    eventExpertSpeakerBackImage = models.CharField(default="",max_length=150,null=True, blank=True)
    

class speakerSection (models.Model):
    speakerSectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    speakerSectionSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    speakerSectionButtonTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    speakerSectionButtonIcon = models.CharField(default="",max_length=100,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class homePageThirdSection (models.Model):
    thirdSectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    thirdSectionSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    thirdSectionDescription = models.TextField(null=True,blank=True)
    thirdSectionVideoLink = models.TextField(null=True,blank=True)
    thirdSectionBackgroundImage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class keyPointsSection (models.Model):
    keyPointSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    keyPointSectionButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    keyPointSectionButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    isKeyPointSectionButtonEnable = models.CharField(default="No",max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class keyPointsSectionPoints (models.Model):
    pointLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    pointDescription = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class countSection (models.Model):
    countSectionBackgroundImage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class countSectionTopic (models.Model):
    topicLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    topicCount = models.CharField(default="",max_length=150,null=True, blank=True)
    countIcon = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class companiesLogoSection (models.Model):
    logoLink = models.TextField(null=True,blank=True)
    logoShowOrder = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class testimonialSection (models.Model):
    testimonialSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    testimonialLogo = models.CharField(default="",max_length=150,null=True, blank=True)
    firstTestimonialFirstImage = models.CharField(default="",max_length=150,null=True, blank=True)
    firstTestimonialSecondImage = models.CharField(default="",max_length=150,null=True, blank=True)
    secondTestimonialRightFirstImage = models.CharField(default="",max_length=150,null=True, blank=True)
    secondTestimonialRightSecondImage = models.CharField(default="",max_length=150,null=True, blank=True)
    secondTestimonialLeftFirstImage = models.CharField(default="",max_length=150,null=True, blank=True)
    secondTestimonialLeftSecondImage = models.CharField(default="",max_length=150,null=True, blank=True)
    lastTestimonialFirstImage = models.CharField(default="",max_length=150,null=True, blank=True)
    lastTestimonialSecondImage = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class pastAttandeesSection (models.Model):
    pastAttandeesSectionackgroundImage = models.CharField(default="",max_length=150,null=True, blank=True)
    firstSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    firstSectionBottomLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    firstSectionBottomIcon = models.CharField(default="",max_length=150,null=True, blank=True)
    firstSectionBottomRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionBottomLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionBottomIcon = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionBottomRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    thirdSectionImage = models.CharField(default="",max_length=150,null=True, blank=True)
    thirdSectionButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    thirdSectionButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class sponsorSection (models.Model):
    sponsorSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class footerFirstSectionOptions (models.Model):
    optionName = models.CharField(default="",max_length=150,null=True, blank=True)
    optionRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class footerSocialMediaOptions (models.Model):
    facebookLink = models.CharField(default="",max_length=150,null=True, blank=True)
    instagramLink = models.CharField(default="",max_length=150,null=True, blank=True)
    twitterLink = models.CharField(default="",max_length=150,null=True, blank=True)
    linkedinLink = models.CharField(default="",max_length=150,null=True, blank=True)
    emailLink = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class registerPageSettings (models.Model):
    sectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstPackageTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstPackageDescription = models.TextField(null=True,blank=True)
    groupPassSectionTilte = models.CharField(default="",max_length=150,null=True, blank=True)
    groupPassSectionButtonTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class whoShouldAttendPageData (models.Model):
    sectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstBoldDescription = models.TextField(null=True,blank=True)
    sectionFirstPoints = models.TextField(null=True,blank=True)
    sectionFirstButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstLeftImage = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondPoints = models.TextField(null=True,blank=True)
    sectionSecondButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondRightImage = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionThreeTilte = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionThreeDescription = models.TextField(null=True,blank=True)
    sectionThreeTabOneTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionThreeTabOneDescription = models.TextField(null=True,blank=True)
    sectionThreeTabTwoTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionThreeTabTwoDescription = models.TextField(null=True,blank=True)
    sectionFourTilte = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class speakerPageData (models.Model):
    sectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstDescription = models.TextField(null=True,blank=True)
    sectionFirstButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionFirstLeftImage = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondDescription = models.TextField(null=True,blank=True)
    sectionSecondButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionSecondRightImage = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class speakerPageSectionThreePoints (models.Model):
    pointTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    pointDescription = models.TextField(null=True,blank=True)
    pointIcon = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class sponsorPageData (models.Model):
    introParaHeading = models.CharField(default="",max_length=150,null=True, blank=True)
    introParaDescription = models.TextField(null=True,blank=True)
    introParaButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    introParaButtonRedirectPath = models.CharField(default="",max_length=150,null=True, blank=True)
    introParaImage = models.CharField(default="",max_length=150,null=True, blank=True)

    exhibitSectionTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    exhibitSectionFirstBoxTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    exhibitSectionFirstBoxShortDescription = models.TextField(null=True,blank=True)
    exhibitSectionFirstBoxPoints = models.TextField(null=True,blank=True)

    exhibitSectionSecondBoxTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    exhibitSectionSecondBoxShortDescription = models.TextField(null=True,blank=True)
    exhibitSectionSecondBoxPoints = models.TextField(null=True,blank=True)

    exhibitSectionThirdBoxTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    exhibitSectionThirdBoxShortDescription = models.TextField(null=True,blank=True)
    exhibitSectionThirdBoxPoints = models.TextField(null=True,blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class sponsorPageBulletData (models.Model):
    pointIcon = models.CharField(default="",max_length=150,null=True, blank=True)
    pointShortDescription = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class venuePageData (models.Model):
    venueFirstSectionLeftImage = models.CharField(default="",max_length=150,null=True, blank=True)
    venueFirstSectionFirstTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    venueFirstSectionSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    venueFirstSectionDescription = models.TextField(null=True,blank=True)
    venueAddressLink = models.TextField(null=True,blank=True)
    venueFirstSectionButtonLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    venueSecondSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    venueMapSectionLabel = models.CharField(default="",max_length=150,null=True, blank=True)
    venueMapSectionBackImage = models.CharField(default="",max_length=150,null=True, blank=True)
    venueLocation = models.TextField(null=True,blank=True)
    venueContact = models.TextField(null=True,blank=True)
    venueWebsiteAddress = models.CharField(default="",max_length=150,null=True, blank=True)
    venueMapLink = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class venuePageGallery (models.Model):
    gallerySectionOneBigImage = models.CharField(default="",max_length=150,null=True, blank=True)
    gallerySectionOneSmallImage = models.CharField(default="",max_length=150,null=True, blank=True)
    gallerySectionTwoBigImage = models.CharField(default="",max_length=150,null=True, blank=True)
    gallerySectionTwoSmallImage = models.CharField(default="",max_length=150,null=True, blank=True)
    gallerySectionThreeBigImage = models.CharField(default="",max_length=150,null=True, blank=True)
    gallerySectionThreeSmallImage = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class newsCategory (models.Model):
    categoryName = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class generalNewsPoint (models.Model):
    newsCategoryId = models.ForeignKey(newsCategory,default='',on_delete=CASCADE,null=True,blank=True)
    newsTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    newsShortDescription = models.TextField(null=True,blank=True)
    newsDescription = models.TextField(null=True,blank=True)
    newsPageUrl = models.CharField(default="",max_length=150,null=True, blank=True)
    newsImage = models.CharField(default="",max_length=150,null=True, blank=True)
    newsCreatedDate = models.DateField(null=True,max_length=100,blank=True)
    isTopNews = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)
    newsMetaTitle= models.CharField(default="",max_length=150,null=True, blank=True)
    newsMetaDescription = models.TextField(null=True,blank=True)
    newsImageAltText = models.TextField(null=True,blank=True)

class latestNews (models.Model):
    newsCategoryId = models.ForeignKey(newsCategory,default='',on_delete=CASCADE,null=True,blank=True)
    generalNewsPointId = models.ForeignKey(generalNewsPoint,default='',on_delete=CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class topNews (models.Model):
    newsCategoryId = models.ForeignKey(newsCategory,default='',on_delete=CASCADE,null=True,blank=True)
    generalNewsPointId = models.ForeignKey(generalNewsPoint,default='',on_delete=CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class subscribers (models.Model):
    subscriberName = models.CharField(default="",max_length=150,null=True, blank=True)
    subscriberEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class contactUsData (models.Model):
    contactPersonName = models.CharField(default="",max_length=150,null=True, blank=True)
    contactPersonCompanyName = models.CharField(default="",max_length=150,null=True, blank=True)
    contactPersonEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    contactPersonMobile = models.CharField(default="",max_length=150,null=True, blank=True)
    contactPersonMessage = models.TextField(null=True,blank=True)
    contactUsReason = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class contactUsPageData (models.Model):
    emailLogo = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    sectionShortParagraph = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class contactUsHelpData (models.Model):
    reasonToHelp = models.CharField(default="",max_length=150,null=True, blank=True)
    helpingPersonName = models.CharField(default="",max_length=150,null=True, blank=True)
    helpingPersonDesignation = models.CharField(default="",max_length=150,null=True, blank=True)
    helpingPersonEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class mediaPageHelpers (models.Model):
    companyPersonName = models.CharField(default="",max_length=150,null=True, blank=True)
    companyPersonEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    companyPersonPhone = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class themeColorSettings (models.Model):
    primaryColor = models.CharField(default="",max_length=150,null=True, blank=True)
    secondaryColor = models.CharField(default="",max_length=150,null=True, blank=True)
    lightColor = models.CharField(default="",max_length=150,null=True, blank=True)
    darkColor = models.CharField(default="",max_length=150,null=True, blank=True)
    gradientColor = models.CharField(default="",max_length=150,null=True, blank=True)
    headerContent = models.TextField(default="",null=True, blank=True)
    editorStyle = models.TextField(default="",null=True, blank=True)
    headerType = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class pressMediaPageData (models.Model):
    pressMediaPageTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    pressMediaPageDescription = models.TextField(null=True,blank=True)
    pressMediaPageSecondTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    pressMediaPageSecondSectionImage = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class pressMediaPageBoxData (models.Model):
    boxTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    boxDescription = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class sponsorPackagePageData (models.Model):
    firstSectionLeftImage = models.CharField(default="",max_length=150,null=True, blank=True)
    firstSectionButtonTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    secondSectionShortPara = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class standOutCrowdRequestData(models.Model):
    requesterName = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterCompanyName = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterMobile = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterMessage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class becomeSpeakerRequestData(models.Model):
    requesterName = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterCompanyName = models.CharField(default="",max_length=150,null=True, blank=True)
    proposedTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterMessage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class quickProposalRequestData(models.Model):
    requesterName = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterCompanyName = models.CharField(default="",max_length=150,null=True, blank=True)
    proposedTitle = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    requesterMessage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class endUserPassRegistrationRequestData(models.Model):
    userName = models.CharField(default="",max_length=150,null=True, blank=True)
    userCompany = models.CharField(default="",max_length=150,null=True, blank=True)
    userEmail = models.CharField(default="",max_length=150,null=True, blank=True)
    userMobile = models.CharField(default="",max_length=150,null=True, blank=True)
    userInterest = models.CharField(default="",max_length=150,null=True, blank=True)
    noOfAttandees = models.CharField(default="",max_length=150,null=True, blank=True)
    userMessage = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class pastAttandeeHomeData(models.Model):
    attandeeName = models.CharField(default="",max_length=150,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class SidebarModule(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, null=True, blank=True)
    id_attr = models.CharField(max_length=100, null=True, blank=True)  # ADD THIS
    order = models.IntegerField(default=0)
    link = models.CharField(max_length=200, null=True, blank=True) 
    isDelete = models.CharField(default="No", max_length=10)

class SidebarSubModule(models.Model):
    module = models.ForeignKey(SidebarModule, on_delete=models.CASCADE, related_name='submodules')
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=100)
    id_attr = models.CharField(max_length=100) # To match frontend id in LayoutMenuData
    order = models.IntegerField(default=0)
    isDelete = models.CharField(default="No", max_length=10)

class AdminRole(models.Model):
    name = models.CharField(max_length=100)
    permissions = models.ManyToManyField(SidebarSubModule, blank=True)
    detailed_permissions = models.JSONField(default=dict, blank=True)
    isDelete = models.CharField(default="No", max_length=10)

class AdminUserManager(models.Manager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        if password:
            user.password = make_password(password)
        user.save(using=self._db)
        return user

    def normalize_email(self, email):
        return email.lower()
        
class AdminUser(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    username = models.CharField(max_length=100, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(AdminRole, on_delete=models.SET_NULL, null=True, blank=True)
    permissions = models.ManyToManyField(SidebarSubModule, blank=True)
    detailed_permissions = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    isDelete = models.CharField(default="No", max_length=10)
    otp_code = models.CharField(max_length=6, null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)

    objects = AdminUserManager()

class footerOptions(models.Model):
    footerOptionsName = models.CharField(default="",max_length=50,null=True, blank=True)
    footerOptionsPath = models.CharField(default="",max_length=50,null=True, blank=True)
    isChecked = models.CharField(default="No", max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class toEmails(models.Model):
    toemails = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class agendaSubscriber(models.Model):
    subscriber = models.CharField(null=False,max_length=50,default='No')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class calenderSubscriber(models.Model):
    calenderSubscriber = models.CharField(null=False,max_length=50,default='No')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class sponsorCards(models.Model):
    title = models.CharField(default="",max_length=150,null=True, blank=True)
    price = models.CharField(default="",max_length=150,null=True, blank=True)
    description = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(null=False,max_length=50,default='No')
    updated_by = models.CharField(null=False,max_length=50,default='No')
    isDelete = models.CharField(default="No",max_length=10)

class InvoiceNumberTracker(models.Model):
    invoiceNo = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']