'use strict';

const Alexa = require('alexa-sdk');
const D = "----------";

const APP_ID = "amzn1.ask.skill.9fa2bb31-c881-4a4f-9dfe-491b382e7519";  // TODO replace with your app ID (OPTIONAL).

var states = {
    START: "_START",
    NAMES: "_NAMES",
    WEIGHTS: "_WEIGHTS",
    NUMBERS: "_NUMBERS",
    SYMBOLS: "_SYMBOLS",
};

const handlers = {
    "LaunchRequest": function () {
        console.log(D + "LAUNCH REQUEST.  SETTING STATE = START.  REDIRECT TO BeginHere.")
        this.handler.state = states.START;
        this.emitWithState("BeginHere");
    },
    "NameCardsIntent": function() {
        console.log(D + "NameCardsIntent.  NO STATE.  SETTING STATE = NAMES.  REDIRECT TO NameCards.");
        this.handler.state = states.NAMES;
        this.emitWithState("NameCards");
    },
    "WeightCardsIntent": function() {
        console.log(D + "WeightCardsIntent.  NO STATE.  SETTING STATE = WEIGHTS.  REDIRECT TO WeightCards.");
        this.handler.state = states.WEIGHTS;
        this.emitWithState("WeightCards");
    },
    "NumberCardsIntent": function() {
        console.log(D + "NumberCardsIntent.  NO STATE.  SETTING STATE = NUMBERS.  REDIRECT TO NumberCards.");
        this.handler.state = states.NUMBERS;
        this.emitWithState("NumberCards");
    },
    "SymbolCardsIntent": function() {
        console.log(D + "SymbolCardsIntent.  NO STATE.  SETTING STATE = SYMBOLS.  REDIRECT TO SymbolCards.");
        this.handler.state = states.SYMBOLS;
        this.emitWithState("SymbolCards");
    },
    "Unhandled": function()
    {
        console.log(D + "UNHANDLED INTENT.  NO STATE.  REDIRECTING TO LaunchRequest.")
        this.emitWithState("LaunchRequest");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,
{
    "BeginHere": function() {
        this.emit(":ask", "Welcome to Chemistry Flash Cards! Which cards would you like to use?  Symbols, Element Names, Atomic Weights, or Atomic Numbers?");
    },
    "NameCardsIntent": function() {
        console.log(D + "NameCardsIntent.  STATE == START.  SETTING STATE = NAMES.  REDIRECT TO NameCards.");
        this.handler.state = states.NAMES;
        this.emitWithState("NameCards");
    },
    "WeightCardsIntent": function() {
        console.log(D + "WeightCardsIntent.  STATE == START.  SETTING STATE = WEIGHTS.  REDIRECT TO WeightCards.");
        this.handler.state = states.WEIGHTS;
        this.emitWithState("WeightCards");
    },
    "NumberCardsIntent": function() {
        console.log(D + "NumberCardsIntent.  STATE == START.  SETTING STATE = NUMBERS.  REDIRECT TO NumberCards.");
        this.handler.state = states.NUMBERS;
        this.emitWithState("NumberCards");
    },
    "SymbolCardsIntent": function() {
        console.log(D + "SymbolCardsIntent.  STATE == START.  SETTING STATE = SYMBOLS.  REDIRECT TO SymbolCards.");
        this.handler.state = states.SYMBOLS;
        this.emitWithState("SymbolCards");
    },
    "AMAZON.StartOverIntent": function(){
        this.handler.state = states.START;
        this.emitWithState("BeginHere");
    },
    "Unhandled": function()
    {
        console.log(D + "UNHANDLED INTENT.  STATE == START.  REDIRECTING TO BeginHere.");
        this.emitWithState("BeginHere");
    }
});

const nameHandlers = Alexa.CreateStateHandler(states.NAMES,
{
    "NameCards": function() {
        this.emit(":ask", "OK.  We're doing element names.  I will give you a series of symbols, and you have to tell me what the name of that element is.  Are you ready?");
    },
    "ElementIntent": function() {
        var element = this.event.request.intent.slots.element.value;
        this.emit(":tell", "You said " + languageStrings.en-US.translation.ELEMENTS[3].name);
    },
    "AMAZON.YesIntent": function() {
        this.emit(":ask", "What is the name of H E?");
    },
    "AMAZON.NoIntent": function() {

    },
    "AMAZON.StartOverIntent": function(){
        this.handler.state = states.START;
        this.emitWithState("BeginHere");
    },
    "Unhandled": function()
    {
        console.log(D + "UNHANDLED INTENT.  STATE == NAMES. SETTING STATE = START.  REDIRECTING TO BeginHere.");
        this.handler.state = states.START;
        this.emitWithState("LaunchRequest");
    }
});

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.AppId = APP_ID;
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers, startHandlers, nameHandlers);
    alexa.execute();
};

var languageStrings = {
    "en-GB": {
        "translation": {
        }
    },
    "en-US": {
        "translation": {
            "ELEMENTS": [               {number: 1,  name: "Hydrogen",   symbol: "H",   weight: 1.008,  type: "Nonmetal"},
                                        {number: 2,  name: "Helium",     symbol: "He",  weight: 4.003,  type: "Noble Gas"},
                                        {number: 3,  name: "Lithium",    symbol: "Li",  weight: 6.941,  type: "Alkali Metal"},
                                        {number: 4,  name: "Beryllium",  symbol: "Be",  weight: 9.012,  type: "Alkaline Earth"},
                                        {number: 5,  name: "Boron",      symbol: "B",   weight: 10.811, type: "Semimetal"},
                                        {number: 6,  name: "Carbon",     symbol: "C",   weight: 12.011, type: "Nonmetal"},
                                        {number: 7,  name: "Nitrogen",   symbol: "N",   weight: 14.007, type: "Nonmetal"},
                                        {number: 8,  name: "Oxygen",     symbol: "O",   weight: 15.999, type: "Nonmetal"},
                                        {number: 9,  name: "Fluorine",   symbol: "F",   weight: 18.998, type: "Halogen"},
                                        {number: 10, name: "Neon",       symbol: "Ne",  weight: 20.180, type: "Noble Gas"},
                                        {number: 11, name: "Sodium",     symbol: "Na",  weight: 22.990, type: "Alkali Metal"},
                                        {number: 12, name: "Magnesium",  symbol: "Mg",  weight: 24.305, type: "Alkaline Earth"},
                                        {number: 13, name: "Aluminum",   symbol: "Al",  weight: 26.982, type: "Basic Metal"},
                                        {number: 14, name: "Silicon",    symbol: "Si",  weight: 28.086, type: "Semimetal"},
                                        {number: 15, name: "Phosphorus", symbol: "P",   weight: 30.974, type: "Nonmetal"},
                                        {number: 16, name: "Sulfur",     symbol: "S",   weight: 32.066, type: "Nonmetal"},
                                        {number: 17, name: "Chlorine",   symbol: "Cl",  weight: 35.453, type: "Halogen"},
                                        ],

            "STOP_MESSAGE" : [          "Goodbye!  Let's do this again sometime!", "OK.  We can try again later.", "Bye bye!"],
            "APP_GOODBYE" : [           "Thanks for using Send To Friend! Goodbye!"]
        }
    },
    "de-DE": {
        "translation": {
            
        }
    }
};

