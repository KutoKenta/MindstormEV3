const Alexa = require('ask-sdk-core');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
const Util = require('./util');
const Common = require('./common');

const DEFAULT_PERSISTENT_ATTRIBUTES = require('./default_attributes.json')

// The namespace of the custom directive to be sent by this skill
const NAMESPACE = 'Custom.Mindstorms.Gadget';

// The name of the custom directive to be sent this skill
const NAME_CONTROL = 'control';



// function to return the endpoint associated with the EV3 robot
const getEndpointID = async function (handlerInput) {
    // get the stored endpointId from the attributesManager
    const attributesManager = handlerInput.attributesManager;
    var endpointId = attributesManager.getSessionAttributes().endpointId || [];

    // if there is no stored endpointId, query the connected endpoints and store the new endpointId
    if (endpointId.length === 0) {
        const request = handlerInput.requestEnvelope;
        let { apiEndpoint, apiAccessToken } = request.context.System;
        let apiResponse = await Util.getConnectedEndpoints(apiEndpoint, apiAccessToken);
        if ((apiResponse.endpoints || []).length !== 0) {
            endpointId = apiResponse.endpoints[0].endpointId || [];
            Util.putSessionAttribute(handlerInput, 'endpointId', endpointId);
        }
    }
    return endpointId;
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle: async function (handlerInput) {

        // check for a connected EV3 brick
        const endpointId = getEndpointID(handlerInput);

        // speak an error message to the user if there is no EV3 brick connected
        if (endpointId.length === 0) {
            return handlerInput.responseBuilder
                .speak("I couldn't find an EV3 Brick connected to this Echo device.")
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(`Welcome, you can start issuing commands`)
            .reprompt(`Awaiting commands`)
            .getResponse();
    }
};




const OpenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClawOpen';
    },
    handle: async function (handlerInput) {
        // get the slot values from the intent request
        const request = handlerInput.requestEnvelope;
        const location = Alexa.getSlotValue(request, 'ClawOpen');

        // get the endpoint of the EV3 robot
        const endpointId = await getEndpointID(handlerInput);
        console.log(`endpointId: ${JSON.stringify(endpointId)}`);

        // get the persistent attributes
        const attributesManager = handlerInput.attributesManager;
        var s3Attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.entries(s3Attributes).length === 0)
            s3Attributes = DEFAULT_PERSISTENT_ATTRIBUTES;

        console.log(JSON.stringify(s3Attributes));
        const directive = Util.build(endpointId, NAMESPACE, NAME_CONTROL,
            {
                type: 'open',
                state: s3Attributes.robot.state,
                location: location_fixed,
            });
        return handlerInput.responseBuilder
            .addDirective(directive)
            .getResponse();
    }

};

const CloseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClawClose';
    },
    handle: async function (handlerInput) {
        // get the slot values from the intent request
        const request = handlerInput.requestEnvelope;
        const location = Alexa.getSlotValue(request, 'ClawOpen');

        // get the endpoint of the EV3 robot
        const endpointId = await getEndpointID(handlerInput);
        console.log(`endpointId: ${JSON.stringify(endpointId)}`);

        // get the persistent attributes
        const attributesManager = handlerInput.attributesManager;
        var s3Attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.entries(s3Attributes).length === 0)
            s3Attributes = DEFAULT_PERSISTENT_ATTRIBUTES;

        console.log(JSON.stringify(s3Attributes));
        const directive = Util.build(endpointId, NAMESPACE, NAME_CONTROL,
            {
                type: 'close',
                state: s3Attributes.robot.state,
                location: location_fixed,
            });
        return handlerInput.responseBuilder
            .addDirective(directive)
            .getResponse();
    }

};



const UpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClawUp';
    },
    handle: async function (handlerInput) {
        // get the slot values from the intent request
        const request = handlerInput.requestEnvelope;
        const location = Alexa.getSlotValue(request, 'ClawUp');

        // get the endpoint of the EV3 robot
        const endpointId = await getEndpointID(handlerInput);
        console.log(`endpointId: ${JSON.stringify(endpointId)}`);

        // get the persistent attributes
        const attributesManager = handlerInput.attributesManager;
        var s3Attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.entries(s3Attributes).length === 0)
            s3Attributes = DEFAULT_PERSISTENT_ATTRIBUTES;

        console.log(JSON.stringify(s3Attributes));
        const directive = Util.build(endpointId, NAMESPACE, NAME_CONTROL,
            {
                type: 'up',
                state: s3Attributes.robot.state,
                location: location_fixed,
            });
        return handlerInput.responseBuilder
            .addDirective(directive)
            .getResponse();
    }

};



const DownIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClawDown';
    },
    handle: async function (handlerInput) {
        // get the slot values from the intent request
        const request = handlerInput.requestEnvelope;
        const location = Alexa.getSlotValue(request, 'ClawDown');

        // get the endpoint of the EV3 robot
        const endpointId = await getEndpointID(handlerInput);
        console.log(`endpointId: ${JSON.stringify(endpointId)}`);

        // get the persistent attributes
        const attributesManager = handlerInput.attributesManager;
        var s3Attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.entries(s3Attributes).length === 0)
            s3Attributes = DEFAULT_PERSISTENT_ATTRIBUTES;

        console.log(JSON.stringify(s3Attributes));
        const directive = Util.build(endpointId, NAMESPACE, NAME_CONTROL,
            {
                type: 'down',
                state: s3Attributes.robot.state,
                location: location_fixed,
            });
        return handlerInput.responseBuilder
            .addDirective(directive)
            .getResponse();
    }

};



const DanceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClawDance';
    },
    handle: async function (handlerInput) {
        // get the slot values from the intent request
        const request = handlerInput.requestEnvelope;
        const location = Alexa.getSlotValue(request, 'ClawDance');

        // get the endpoint of the EV3 robot
        const endpointId = await getEndpointID(handlerInput);
        console.log(`endpointId: ${JSON.stringify(endpointId)}`);

        // get the persistent attributes
        const attributesManager = handlerInput.attributesManager;
        var s3Attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.entries(s3Attributes).length === 0)
            s3Attributes = DEFAULT_PERSISTENT_ATTRIBUTES;

        console.log(JSON.stringify(s3Attributes));
        const directive = Util.build(endpointId, NAMESPACE, NAME_CONTROL,
            {
                type: 'open',
                state: s3Attributes.robot.state,
                location: location_fixed,
            });
        return handlerInput.responseBuilder
            .addDirective(directive)
            .getResponse();
    }

};

exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({ bucketName: process.env.S3_PERSISTENCE_BUCKET })
    )
    .addRequestHandlers(
        LaunchRequestHandler,
        OpenIntentHandler,
        CloseIntentHandler,
        UpIntentHandler,
        DownHandler,
        DanceIntentHandler,
        Common.SessionEndedRequestHandler,
        Common.IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addRequestInterceptors(Common.RequestInterceptor)
    .addErrorHandlers(
        Common.ErrorHandler,
    )
    .lambda();