"use strict";
import dayjs from "dayjs";
const SERVER_URL = "http://localhost:3001/api";
// USER APIs
const login = async (credentials) => {
  try {
    const response = await fetch(SERVER_URL + "/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errMessage = await response.json(); // {error:}
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getUserInfo = async () => {
  try {
    const response = await fetch(SERVER_URL + "/sessions/current", {
      credentials: "include",
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getUsers = async () => {
  try {
    const response = await fetch(SERVER_URL + "/users", {
      credentials: "include",
    });
    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const logout = async () => {
  try {
    const response = await fetch(SERVER_URL + "/sessions/current", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return null;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

// Tickets APIs
async function getAllServices() {
  // call  /api/services
  const response = await fetch(SERVER_URL + "/services");
  const services = await response.json();

  if (response.ok) {
    return services.map((e) => ({
      id: e.id,
      serviceName: e.serviceName,
      id_counter: e.id_counter
    }));
  } else {
    throw services;
  }
}

async function getAllCounters() {
  // call  /api/counters
  const response = await fetch(SERVER_URL + "/counters");
  const counters = await response.json();

  if (response.ok) {
    return counters.map((e) => ({
      id: e.id_counter,
      value_number: e.value_number,
    }));
  } else {
    throw counters;
  }
}

async function getCounterById(id) {
  
  // call  /api/counters/<id>
  const response = await fetch(SERVER_URL+`/counters/${id}`);
  const question = await response.json();

  if (response.ok) 
  {
    const e = question;
    return {  id_counter: e.id_counter,  value_number: e.value_number};
  } 
  else 
  {
    throw question; 
  }
}

const getTickets = async () => {
  try {
    const response = await fetch(SERVER_URL + "/tickets", {
      credentials: "include",
    });
    if (response.ok) {
      const ticketsJson = await response.json();
      return ticketsJson;
      /*.map((p) => {
        const clientTicket = {
          id: p.id,
          title: p.title,
          authorid: p.authorid,
          author: p.author,
          creationDate: p.creationDate,
          publicationDate: p.publicationDate,
        };*/
      //return clientPage;
      //});
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const getTicketByServiceId = async (serviceId) => {
  try {
    if (serviceId === null) {
      throw { error: "id is not a number" };
    }
    if (!Number.isInteger(Number(serviceId)) || Number(serviceId) < 1) {
      throw { error: "id must be well formatted" };
    }
    const response = await fetch(SERVER_URL + `/tickets/${serviceId}`, {
      credentials: "include",
    });
    if (response.ok) {
      const page = await response.json();
      return page;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

/*
const getPublicatedtickets = async () => {
  try {
    const response = await fetch(SERVER_URL + "/tickets/publicated");
    if (response.ok) {
      const ticketsJson = await response.json();
      return ticketsJson.map((p) => {
        const clientPage = {
          id: p.id,
          title: p.title,
          authorid: p.authorid,
          author: p.author,
          creationDate: p.creationDate,
          publicationDate: p.publicationDate,
        };
        return clientPage;
      });
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getPageById = async (id) => {
  try {
    if (id === null) {
      throw { error: "id is not a number" };
    }
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      throw { error: "id must be well formatted" };
    }
    const response = await fetch(SERVER_URL + `/tickets/${id}`, {
      credentials: "include",
    });
    if (response.ok) {
      const page = await response.json();
      // Order the contents array based on the position property
      const orderedContentsByPosition = page.contents.sort(
        (a, b) => a.position - b.position
      );
      // Update the contents property with the ordered array
      page.contents = orderedContentsByPosition;
      return page;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const updatePage = async (pageid, page) => {
  try {
    if (pageid === null) {
      throw { error: "id is not a number" };
    }
    if (!page || typeof page !== "object") {
      throw { error: "page is undefined" };
    }
    if (
      !page.hasOwnProperty("title") ||
      !page.hasOwnProperty("authorid") ||
      !page.hasOwnProperty("creationDate") ||
      !page.hasOwnProperty("publicationDate") ||
      !page.hasOwnProperty("contents")
    ) {
      throw { error: "page has not all the properties" };
    }
    if (!Number.isInteger(Number(pageid)) || Number(pageid) < 1) {
      throw { error: "id must be well formatted" };
    }
    if (page.title.length < 2 || page.title.length > 160) {
      throw { error: "Title length must be between 2 and 160 characters" };
    }
    if (!Number.isInteger(Number(page.authorid)) || Number(page.authorid) < 0) {
      throw { error: "Author ID must be a non-negative integer" };
    }
    if (!dayjs(page.creationDate).isValid()) {
      throw { error: "Invalid creation date format" };
    }
    if (
      page.publicationDate !== "" &&
      (!page.publicationDate.isValid() ||
        page.publicationDate.format("YYYY-MM-DD").length != 10)
    ) {
      throw { error: "Invalid publication date format" };
    }
    const creationDate = dayjs(page.creationDate);
    if (
      page.publicationDate !== "" &&
      creationDate.isAfter(page.publicationDate)
    ) {
      throw { error: "creation date cannot be after the publication date" };
    }
    if (!Array.isArray(page.contents) || page.contents.length < 2) {
      throw { error: "Contents must be an array with a minimum length of 2" };
    }
    const response = await fetch(SERVER_URL + "/tickets/" + pageid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: pageid,
        title: page.title,
        authorid: page.authorid,
        creationDate: dayjs(page.creationDate).format("YYYY-MM-DD"),
        publicationDate: page.publicationDate
          ? dayjs(page.publicationDate).format("YYYY-MM-DD")
          : "",
        contents: page.contents,
      }),
    });
    if (!response.ok) {
      const errMessage = await response.json();
      throw errMessage;
    } else {
      return null;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const addPage = async (page) => {
  try {
    if (!page || typeof page !== "object") {
      throw { error: "page is undefined" };
    }
    if (
      !page.hasOwnProperty("title") ||
      !page.hasOwnProperty("authorid") ||
      !page.hasOwnProperty("creationDate") ||
      !page.hasOwnProperty("publicationDate") ||
      !page.hasOwnProperty("contents")
    ) {
      throw { error: "page has not all the properties" };
    }
    if (page.title.length < 2 || page.title.length > 160) {
      throw { error: "Title length must be between 2 and 160 characters" };
    }
    if (parseInt(page.authorid) < 0) {
      throw { error: "Author ID must be a non-negative integer" };
    }
    if (!page.creationDate.isValid()) {
      throw { error: "Invalid creation date format" };
    }
    if (
      page.publicationDate !== "" &&
      (!page.publicationDate.isValid() ||
        page.publicationDate.format("YYYY-MM-DD").length != 10)
    ) {
      throw { error: "Invalid publication date format" };
    }
    if (
      page.publicationDate !== "" &&
      page.creationDate.isAfter(page.publicationDate)
    ) {
      throw { error: "creation date cannot be after the publication date" };
    }
    if (!Array.isArray(page.contents) || page.contents.length < 2) {
      throw { error: "Contents must be an array with a minimum length of 2" };
    }
    const response = await fetch(SERVER_URL + "/tickets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: page.title,
        authorid: page.authorid,
        creationDate: dayjs(page.creationDate).format("YYYY-MM-DD"),
        publicationDate:
          page.publicationDate !== ""
            ? dayjs(page.publicationDate).format("YYYY-MM-DD")
            : "",
        contents: page.contents,
      }),
    });
    if (!response.ok) {
      const errMessage = await response.json();
      throw errMessage;
    } else if (response.ok) {
      // the server always returns a JSON, even empty {}. Never null or non-json, otherwise the method will fail
      const pageAdded = await response.json();
      return pageAdded;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const deletePage = async (pageid) => {
  try {
    if (pageid === null || typeof pageid !== "number" || pageid < 1) {
      throw { error: "id is not a number or invalid" };
    }
    const response = await fetch(SERVER_URL + `/tickets/${pageid}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const errMessage = await response.json();
      throw errMessage;
    } else if (response.ok) {
      const pageRemovedStatus = await response.json();
      return pageRemovedStatus;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getImages = async () => {
  try {
    const response = await fetch(SERVER_URL + "/images");
    if (response.ok) {
      const imagesJson = await response.json();
      return imagesJson;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
// TITLE APIs
const getTitle = async () => {
  try {
    const response = await fetch(SERVER_URL + "/titles");
    if (response.ok) {
      const titleJSON = await response.json();
      return titleJSON.title;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const updateTitle = async (title) => {
  try {
    if (
      !title ||
      typeof title !== "string" ||
      title.length < 2 ||
      title.length > 160
    )
      throw { error: "title is not well formatted" };
    const response = await fetch(SERVER_URL + "/titles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: title,
      }),
    });
    if (!response.ok) {
      const errMessage = await response.json();
      throw errMessage;
    } else {
      const titleObject = await response.json();
      return titleObject.title;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
*/
const API = {
  login,
  logout,
  getUserInfo,
  getUsers,
  getTickets,
  getAllServices,
  getAllCounters,
  getTicketByServiceId,
  getCounterById
};

export default API;
