const ElasticSearch = `

input FeaturesPayload {
 query:AllFeaturesQuery
 from: Int
 size: Int
}
input AllFeaturesQuery{
  bool:FeaturesBool
}
input FeaturesBool{
  must:[FeaturesMust]
}
input FeaturesMust{
   match: FeatureMatch
}
input FeatureMatch{
   features: String
}

input AllHospitalPayload{
 from: Int
 size: Int
}

input HospitalPayload {
 query:HospitalQuery
 from: Int
 size: Int
}
input HospitalQuery{
   query_string: HospitalQueryString
}
input HospitalQueryString{
    query: String
}
type HospitalFeatureResponse{
     took : Int
     _shards: SearchShared 
     hits: FeatureHit
}
type FeatureHit{
    total: Int
    hits: [FeatureHits]
}

type FeatureHits {
    _index: String
    _type: String
    _id: String
    _source: FeatureSource
}

type FeatureSource{
  id: String
  feature: String
}

type HospitalResponse {
     took : Int
     _shards:SearchShared 
     hits: HospitalHit

}


type SearchShared{
    total: Int
    successful:Int
    skipped:Int
    failed:Int
}
type HospitalHit {
    total: Int
    hits: [HospitalHits]
}

type HospitalHits {
    _index: String
    _type: String
    _id: String
    _source: HospitalSource
}
type HospitalSource{
    placeId: String
    geoPlaceName: String
    geoCode: String
    placeName: String
    address: String
    city: String
    state: String
    pinCode: String
    stdCode: String
    contactNumber: String
    formattedAddress: String
    formattedPhoneNumber: String
    scope: String
    rating: String
    placeType: String
    features: [String]
    companys:[String]
    mapUrl: String
    website: String
}
type EnquirySearchResponse {
     took : Int
     _shards:SearchShared 
     hits: EnquirySearchHit
}

type EnquirySearchHit {
    total: Int
    hits: [EnquiryHits]
}

type EnquiryHits {
    _index: String
    _type: String
    _id: String
    _source: EnquirySource
}
type EnquirySource{
    enquiry_id: String
    channel: String
    location: String
    userId: String
    mobile:String
    name:String
    email:String
    created_by: String
    created_by_userId: String
    created_for_userId:String
    chosen_sumInsured: Int
    chosen_term: Int
    members: [EnquiryMembers]
    diseases:[EnquiryDiseases]
    created_at: String
    updated_at: String
    status: String
    order: SearchOrderResponse
    }


type SearchOrderResponse {
    order_id: String
    enquiry_id: String
    status: String
    channel: String
    choosen_sumInsured: Int
    choosen_term: Int
    location: String
    userId: String
    created_by: String
    created_by_userId: String
    created_for_userId: String
    quote : QuoteResponse
    members : [OrderInsuredMemberResponse]
    addresses: [OrderAddress]
    created_at: String
    updated_at: String
    updated_by_userId: String
    updated_by: String
    policy: PolicyResponse
}


type UserSearchResponse {
    type : String
    enquiryType:EnquirySearchResponse
    orderType: OrderSearchResponse  
    policyType: PolicySearchResponse
}

type AgentResponse {
    enquiryList:EnquirySearchResponse
    orderList: OrderSearchResponse  
    policyList: PolicySearchResponse
}


type OrderSearchResponse {
     took : Int
     _shards:SearchShared 
     hits: OrderSearchHit
}

type OrderSearchHit {
    total: Int
    hits: [OrderHits]
}

type OrderHits {
    _index: String
    _type: String
    _id: String
    _source: OrderSource
}


type OrderSource {
    order_id: String
    enquiry_id: String
    status: String
    channel: String
    name:String
    email:String
    mobile:String
    choosen_sumInsured: Int
    choosen_term: Int
    location: String
    userId: String
    created_by: String
    created_by_userId: String
    created_for_userId:String
    quote : QuoteResponse
    members : [OrderInsuredMemberResponse]
    addresses: [OrderAddress]
    created_at: String
    updated_at: String
    updated_by_userId: String
    updated_by: String
}



type PolicySearchResponse {
     took : Int
     _shards:SearchShared 
     hits: PolicySearchHit
}

type PolicySearchHit {
    total: Int
    hits: [PolicyHits]
}

type PolicyHits {
    _index: String
    _type: String
    _id: String
    _source: PolicySource
}


type PolicySource {
    policy_id: String
    order_id: String
    status: String
    coi_number: String
    document_id: String
    policy_start_date: String
    policy_end_date: String
    created_by: String
    created_by_user_id: String
    created_at: String
    updated_at: String
    name: String
    mobile: String
    email: String
    channel: String
    location: String
    sumAssured:String
    basePremium:String

}

input SearchPayload{
  query: SearchQuery
  from :Int
  size :Int
}

input SearchQuery{
  bool: Bool
  range: Range
}

input Range{
  key :String
  gte : String
  lte : String 
}

input Bool{
must :[Must]
}
input Must {
  match : Match 
}

input Match {
  key : String
  value: String

}


type EnquiryMembers {
   member_id: String
   member: String
   type: String
   visibleName: String
   age : Int
   age_in_months: Int
   gender: String
}


type EnquiryDiseases{
   member_id: String
   diseases:[String]
}

type QuoteResponse {
 productId: String
 sumAssured: Int
 term: Int
 coverType: String
 serviceTax: String
 basePremium: String
 totalPremium: String
 quoteId: String
 addonIdList: [OrderAddonResponse]
 created_at: String
 updated_at: String
}
type OrderInsuredMemberResponse {
            title: String
			firstName: String
			lastName: String
			gender: String
			dateOfBirth: String
			emailId: String
			mobileNum: String
			userAge: String
			pancardNum: String
			martialStatus: String
			landLine: String,
			insuredMemberRelationShipWithProposer: String
			medicalQuestions : [MedicalQuestionResponse]
			isProposer: Boolean 
			insured: Boolean
			created_at: String
            updated_at: String
}

type OrderAddress{
                addressType: String
                addressLine1: String
                addressLine2: String
                state: String
                area: String
                city: String
                pincode: String
}
type PolicyResponse {
    policy_id: String
    order_id: String
    status: String
    coi_number: String
    document_id: String
    policy_start_date: String
    policy_end_date: String
    created_by: String
    created_by_userId: String
    created_at: String
    updated_at: String
}



type OrderAddonResponse {
   addonCode: String
   addonName: String
   created_at: String
   updated_at: String
}

type MedicalQuestionResponse{
    questionCode: String
    questionSetCode: String
    isAnswer: Boolean
    existingSince: String
    questionText: String
    questionDescription: String
    questionDescriptionCode: String
}


`;
export default ElasticSearch
