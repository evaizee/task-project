package dashboard

import "go.mongodb.org/mongo-driver/bson/primitive"

type Board struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title string `json:"name,omitempty" bson:"name,omitempty"`
	Status int64 `json:"status,omitempty" bson:"status,omitempty"`
	OwnerPassword string `json:"owner_password,omitempty" bson:"owner_password,omitempty"`
	GuestPassword string `json:"guest_password,omitempty" bson:"guest_password,omitempty"`
	Permission int64 `json:"permission,omitempty" bson:"permission,omitempty"`
	CreatedAt int64 `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

