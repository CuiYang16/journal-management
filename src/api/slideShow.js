import request from "@/utils/request";

export function getSlides() {
  return request({
    url: "/jm-user/slide/get-slides",
    method: "get"
  });
}

export function delSlides(name) {
  return request({
    url: "/jm-user/slide/del-slide",
    method: "delete",
    data: { name }
  });
}
