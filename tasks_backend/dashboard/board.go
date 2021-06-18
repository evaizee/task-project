package dashboard

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Board struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Status int64 `json:"status,omitempty" bson:"status,omitempty"`
	OwnerPassword string `json:"owner_password,omitempty" bson:"owner_password,omitempty"`
	GuestPassword string `json:"guest_password,omitempty" bson:"guest_password,omitempty"`
	Permission int64 `json:"permission,omitempty" bson:"permission,omitempty"`
	CreatedAt int64 `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

const ACTIVE_STATUS = 1
const NOT_ACTIVE_STATUS = 2

func CreateBoard(board Board) {
	board.CreatedAt = time.Now().Unix()
	board.UpdatedAt = time.Now().Unix()
	board.Status = ACTIVE_STATUS

	db, err := connect()
    if err != nil {
        log.Fatal(err.Error())
    }

	insertResult, err := db.Collection("boards").InsertOne(context.Background(), board)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}

func UpdateBoardData(id string, name string, permission int, status int) {
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
		primitive.E{Key: "type", Value: permission},
		primitive.E{Key: "type", Value: status},
		primitive.E{Key: "updated_at", Value: time.Now().Unix()},
	}}}

	updateResult, err := db.Collection("tasks").UpdateOne(ctx, bson.M{"_id": docID}, updater)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Updated a Single Record ", updateResult.UpsertedID)
}

