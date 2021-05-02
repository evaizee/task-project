package dashboard

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Task struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	BoardID string `json:"board_id,omitempty" bson:"board_id,omitempty"`
	Type int64 `json:"type,omitempty" bson:"type,omitempty"`
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Color string `json:"color,omitempty" bson:"color,omitempty"`
	CreatedAt int64 `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

var ctx = context.Background()

func InsertOneTask(task Task) {
	task.CreatedAt = time.Now().Unix()
	task.UpdatedAt = time.Now().Unix()

	db, err := connect()
    if err != nil {
        log.Fatal(err.Error())
    }

	insertResult, err := db.Collection("tasks").InsertOne(context.Background(), task)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}

func GetOneTask(id string) (Task) {
	db, err := connect()
    if err != nil {
        log.Fatal(err.Error())
    }

	docID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
        log.Fatal(err.Error())
    }

	result := Task{}

	err = db.Collection("tasks").FindOne(ctx, bson.M{"_id": docID}).Decode(&result)
	if err != nil {
        log.Fatal(err.Error())
    }

	return result
}

func UpdateOneTask(id string, name string, taskType int) {
	db, err := connect()
    if err != nil {
        log.Fatal(err.Error())
    }
	
	docID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
        log.Fatal(err.Error())
    }

	updater := bson.D{primitive.E{Key: "$set", Value: bson.D{
		primitive.E{Key: "name", Value: name},
		primitive.E{Key: "type", Value: taskType},
		primitive.E{Key: "updated_at", Value: time.Now().Unix()},
	}}}

	updateResult, err := db.Collection("tasks").UpdateOne(ctx, bson.M{"_id": docID}, updater)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Updated a Single Record ", updateResult.UpsertedID)
}

func connect() (*mongo.Database, error) {
    clientOptions := options.Client()
    clientOptions.ApplyURI("mongodb://localhost:27017")
    client, err := mongo.NewClient(clientOptions)
    if err != nil {
        return nil, err
    }

    err = client.Connect(ctx)
    if err != nil {
        return nil, err
    }

    return client.Database("react_project"), nil
}