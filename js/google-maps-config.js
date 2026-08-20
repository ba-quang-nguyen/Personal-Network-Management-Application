/* js/google-maps-config.js
   Public browser config for Google Maps on the location lens.
   Safe to commit only with a browser-restricted key.
   - apiKey: key của bạn (bật "Maps JavaScript API" + billing trong Google Cloud Console).
   - mapId: "DEMO_MAP_ID" chạy được ngay không cần tạo gì; muốn custom style thì tạo
     Map ID riêng (Google Cloud Console → Google Maps Platform → Map Management)
     rồi dán vào đây. Map KHÔNG được để trống — thiếu Map ID làm Google Maps
     hiện lỗi "This page can't load Google Maps correctly".
*/
window.GOOGLE_MAPS_CONFIG = Object.freeze({
  apiKey: "AIzaSyCmztW_dMzgyWq4iyzq1QeqV7dUkB7qc6U",
  mapId: "DEMO_MAP_ID",
});
