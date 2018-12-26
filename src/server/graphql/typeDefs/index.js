import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date
  enum Gender {
    MALE
    FEMALE
  }

  interface PostInterface {
    id: ID!
    meeting: MeetingType
  }

  type PhoneNumberType {
    id: ID!
    number: String!
    type: String!
  }

  type EmailAddressType {
    id: ID!
    address: String!
    type: String!
  }

  type ResourceType {
    id: ID!
    ident: String!
    price: Float
    title: String!
    subTitle: String
  }

  type DocumentType {
    id: ID!
    title: String!
    date: String!
    content: String!
  }

  type DocumentMapType {
    date: String!
    documents: [DocumentType!]!
  }

  type ArticleType {
    id: ID!
    issueDate: Date!
    content: String!
    groups: [UserGroupType!]!
    restricted: Boolean!
  }

  type SessionType {
    id: ID!
    name: String!
    description: String!
    time: String
    events: [EventType!]!
  }

  type EventType {
    id: ID!
    name: String!
    presenters: [UserType!]!
    occurrence: String
    locations: [LocationType!]!
    meetings: [MeetingType!]!
    session: SessionType!
  }

  type FeedbackType implements PostInterface {
    id: ID!
    meeting: MeetingType
  }

  type AnswerType implements PostInterface {
    id: ID!
    meeting: MeetingType
    question: QuestionType!
    content: String!
    bestAnswer: Boolean!
    comments: [CommentType!]!
  }

  type QuestionType implements PostInterface {
    id: ID!
    meeting: MeetingType
    content: String!
    answers: [AnswerType!]!
    bestAnswer: AnswerType
    comments: [CommentType!]!
  }

  type CommentType implements PostInterface {
    id: ID!
    meeting: MeetingType
    content: String!
    parent: PostInterface!
    comments: [CommentType!]!
  }

  type StoryType implements PostInterface {
    id: ID!
    meeting: MeetingType
    content: String!
    comments: [CommentType!]!
  }

  type MeetingType {
    id: ID!
    event: EventType!
    presenters: [UserType!]!
    meetingNotes: [MeetingNoteType!]!
    posts: [PostInterface!]!
    presentation: PresentationType
  }

  type MeetingNoteType {
    id: ID!
    user: UserType!
    created: Date!
    updated: Date!
    text: String
  }

  type TransitionType {
    id: ID!
    from: Int!
    to: Int!
    time: Date!
  }

  type PresentationNoteType {
    id: ID!
    content: String!
  }

  type PresentationType {
    id: ID!
    title: String!
    currentSlide: Int
    startTime: Date
    endTime: Date
    transitions: [TransitionType!]!
    presenters: [UserType!]!
    slides: [SlideType!]!
    notes: [PresentationNoteType!]!
  }

  type SlideType {
    id: ID!
    presentation: PresentationType!
    index: Int!
    content: String!
    notes: [SlideNoteType!]!
  }

  type SlideNoteType {
    id: ID!
    content: String
  }

  type LocationType {
    id: ID!
    name: String!
  }

  type UserGroupType {
    id: ID!
    name: String!
    description: String
    members: [UserType!]!
  }

  type ImageType {
    uri: String!
    width: Int!
    height: Int!
    alt: String
  }

  type UserType {
    id: ID!
    name: String!
    img: ImageType
    gender: Gender
    firstName: String
    lastName: String!
    userName: String!
    email: EmailAddressType
    emails: [EmailAddressType!]!
    phone: PhoneNumberType
    phones: [PhoneNumberType!]!
    anniversary: Date
    birthday: Date
    memberSince: Date
    admin: Boolean!
    firstVisit: Date
    father: UserType
    mother: UserType
    children: [UserType!]!
    groups: [UserGroupType!]!
    prayerRequests: [PrayerRequestType!]!
    journal: [JournalEntryType!]!
  }

  input UserInput {
    firstName: String
    lastName: String!
    email: String
    phone: String
    anniversary: Date
    birthday: Date
    memberSince: Date
    firstVisit: Date
  }

  type JournalEntryType {
    id: ID!
    user: UserType!
    content: String
    date: Date
  }

  type PrayerRequestType {
    id: ID!
    date: Date!
    user: UserType!
    content: String
    public: Boolean!
    answered: Date
    answer: String!
  }

  enum NotificationMethod {
    EMAIL
    PUSH
    SMS
    VOICE
  }

  type NotificationType {
    id: ID!
    subject: String!
    body: String!
    userNotifications: [UserNotificationType!]!
  }

  type UserNotificationType {
    id: ID!
    notification: NotificationType!
    user: UserType!
    method: NotificationMethod!
  }

  type SongType {
    id: ID!
    title: String!
    license: String
    artist: String
    credits: String
    songWriters: String
    stanzas: [String!]!
  }

  type CounselingNoteType {
    id: ID!
    content: String!
    counselors: [UserType!]!
    counselees: [UserType!]!
  }

  input MetadataInput {
    value: String
  }

  input CardInput {
    id: ID!
    address_city: String
    address_country: String
    address_line1: String
    address_line1_check: String
    address_line2: String
    address_state: String
    address_zip: String
    address_zip_check: String
    brand: String
    country: String
    metadata: MetadataInput
    cvc_check: String
    dynamic_last4: String
    exp_month: Int
    exp_year: Int
    funding: String
    last4: String
    name: String
    object: String!
    tokenization_method: String
  }

  input TokenInput {
    id: ID!
    card: CardInput
    client_ip: String
    created: Int!
    livemode: Boolean!
    object: String!
    type: String!
    used: Boolean!
  }

  input SignUpInput {
    email: String!
    confirmEmail: String!
    userName: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  input SubscriptionInput {
    endpoint: String!
    expirationTime: String
    keys: KeysInput
  }

  input PushInput {
    title: String!
    body: String!
    url: String!
  }

  input KeysInput {
    p256dh: String!
    auth: String!
  }

  input ResetPasswordInput {
    token: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    hello: String!
    me: UserType
    getUsers: [UserType!]!
    getUser(id: ID!): UserType!
    getDocuments: [DocumentType!]!
    getDocumentsByDate: [DocumentMapType!]!
    getDocument(id: ID!): DocumentType!
  }
  type Mutation {
    createUser(input: UserInput!): UserType!
    updateUser(id: ID!, input: UserInput!): UserType!
    sendGift(
      token: TokenInput!
      amount: Float!
      email: String
      recurring: Boolean!
      frequency: String
      date: Date
    ): String!
    getPushes(input: SubscriptionInput!): String!
    sendPush(input: PushInput!): String!
    signUp(input: SignUpInput!): UserType!
    logIn(input: LoginInput!): UserType!
    logOut: String!
    forgotPassword(email: String!): String!
    resetPassword(input: ResetPasswordInput!): UserType!
  }
`;

export default typeDefs;
