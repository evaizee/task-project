package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/evaizee/tasks/dashboard"
	"github.com/gorilla/mux"
)

func main() {
	handleRouting()
}

type Response struct {
	Payload interface{}
	Message string
}

func handleRouting() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage)
	router.HandleFunc("/api/task", createTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/all", getAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task/{id}", updateTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/task/{id}", getTask).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/board", createBoard).Methods("POST", "OPTIONS")
	//router.HandleFunc("/api/board", getBoard).Methods("GET", "OPTIONS")

	fmt.Println("Server Started")
	log.Fatal(http.ListenAndServe(":8050", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello from homepage")
}

func createTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var task dashboard.Task
	task.Name = r.FormValue("name")
	taskType,_ := strconv.ParseInt(r.FormValue("type"), 10, 64)
	task.Type = taskType
	task.Color = r.FormValue("color")

	dashboard.InsertOneTask(task)
}

func updateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	taskType,_ := strconv.ParseInt(r.FormValue("type"), 10, 64)
	params := mux.Vars(r)
	println(params)
	println(taskType)
	println(r.FormValue("name"))

	dashboard.UpdateOneTask(params["id"], r.FormValue("name"), int(taskType))
}

func getTask (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	task := dashboard.GetOneTask(params["id"])
	response := Response{task, "success"}
	jsonResponse, jsonError := json.Marshal(response)
	
	if jsonError!=nil {
		log.Fatal(jsonError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func createBoard (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var board dashboard.Board
	board.Name = r.FormValue("name")
	board.OwnerPassword = r.FormValue("owner_password")
	board.GuestPassword = r.FormValue("guest_password")
	board.Permission,_ = strconv.ParseInt(r.FormValue("permission"), 10, 64)

	dashboard.CreateBoard(board)
}

func getAllTasks (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	task := dashboard.GetAllTasks()
	response := Response{task, "success"}
	jsonResponse, jsonError := json.Marshal(response)
	
	if jsonError!=nil {
		log.Fatal(jsonError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}