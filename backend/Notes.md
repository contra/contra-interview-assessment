
# Multivariate Feature Flag functionality

## Supported types
 - boolean
 - string
 - number
 - JSONArray
 - JSONObject

## Data Shape

There are two places within the database and schema where these datatypes are saved.

In the database, these values are saved using a jsonb field and are located within UserFeatureFlagAssociation.value and FeatureFlag.possibleValues. 

In the graphQL schema, the shape of these types are defined with FeatureFlagValue and FeatureFlagPossibleValues.

Within the database, the given fields follow the following format:

UserFeatureFlagAssociation.value
{
  "type": String,
  "value": String 
}

FeatureFlag.possibleValues
{
  "type": String,
  "values": String[] 
}

## Note on selected data shape

This format allows for type consistency while also keeping the application as lightweight as possible. The downside to this however is that data is always saved as strings opposed to target data type. This creates additional work for the client to serialize and parse these types. An alternative appraoch that might be better in larger applications is to create a custom scalar type in graphQL which is effectively a union between all desired types




# Data entry from Client
This example is for FeatureFlagPossibleValues. FeatureFlagValue is effectively the same but with a single string value instead of an array

This example shows the shape of the data that would need to be entered in a create function, as well as the shape of the data that will be returned in the userAccounts query function

## boolean
User passes:

{
  "type": "boolean"
}

Within a createFeatureFlag mutation, the value property here would be unnessesary as the values will automatically be set to "true" and "false" when "type" = "boolean"

## string
User passes:

{
  "type": "string"
  "values": "string_value"
}

Here the "string_value" can be any valid string. This value can be copmared to a string value that users have to determine the state of the feature flag

## number
User passes:

{
  "type": "number"
  "values": "number_value"
}

Here the "number_value" can be any valid number. This value can be copmared to a number value that users have to determine the state of the feature flag

## JSONArray
User passes:

{
  "type": "JSONArray"
  "values": "array"
}

Here the "array" can be any valid array. The values of the array will be parsed as strings. The users value (which will also be parsed as a string) can be compared to the various values of the array to determine the state of the feature flag.

## JSONObject
User passes:

{
  "type": "JSONObject"
  "values": "object"
}

Here the "object" can be any valid JSON object. The fields of the object can be compared  to the fields of the users "value" JSON object
