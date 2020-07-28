const AppSettings = {
  serverEndpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://thesystem.co.za/integration'//'cp50.domains.co.za:8081/api'
  //serverEndpoint: "http://cp50.domains.co.za:3306/api"
  //password: process.env.NODE_ENV === 'development' ? 'password' : 'f6mDG4J5KK2PVj',

}
export default AppSettings;
