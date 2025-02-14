/**
 * Created by jiachenpan on 16/11/18.
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

export function validNumber(value) {
  const reg = /^([1-9][0-9]*)$/;
  if(value!=null&&value!=""){
    return reg.test(value);
      }
      return true;
}
export function validPrice(value) {
  const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
  return reg.test(value);
}
export function validIssue(value) {
  const reg = /^\d{4}-\d{1,2}(-\d{1,2})?$/;
  return reg.test(value);
}
export function validCN(value) {
  const reg = /^(CN|cn)(\([A-Z]{0,1}\))?[0-9]{2}-[0-9]{4}\/[A-Z0-9]{1,2}$/;
  return reg.test(value);
}

export function validIssn(value) {
  const reg = /^[1-9][0-9]{3}-[0-9][0-9]{3}$/;
  return reg.test(value);
}

export function validIsbn(value) {
  const reg = /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;
  if(value!=null&&value!=""){
return reg.test(value);
  }
  return true;
}

export function validForeignCodes(value) {
  const reg = /^(M|m)[0-9]{3,4}$/;
  if(value!=null&&value!=""){
    return reg.test(value);
      }
      return true;
}

export function validDomesticCode(value) {
  const reg = /^[1-9]-[0-9]{3}$/;
  if(value!=null&&value!=""){
    return reg.test(value);
      }
      return true;
}
