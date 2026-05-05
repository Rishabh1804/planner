# Data Catalog Contract

Status: Draft  
Area: Data / Engine / Options  
Created: 2026-05-05

This contract prepares Holiday Planner for a future structured database of flights, hotels, country trends, mood, seasonality, and related travel intelligence.

## Why this exists

The next major data update is expected to add an actual catalog for:

- Flights.
- Hotels.
- Countries.
- Trends.
- Mood and vibe.
- Seasonality.
- Price movement.
- Comfort signals.
- Recommendation calculations.

This means the Options UI must not hard-code travel facts or become a hidden database.

## Core boundary

Data describes the world.  
Engine calculates meaning.  
Options displays the result.

## Data layer owns

The data layer should eventually own structured records such as:

- Country profiles.
- City and destination profiles.
- Airport and route metadata.
- Flight price bands.
- Flight duration and layover profiles.
- Airline and routing notes.
- Hotel area profiles.
- Hotel price bands by season and experience tier.
- Seasonality windows.
- Weather comfort notes.
- Visa/admin requirements.
- Crowd and trend signals.
- Mood/vibe descriptors.
- Baby-comfort attributes.
- Honeymoon-value attributes.
- Reliability/source metadata.

## Engine layer owns

The engine layer should calculate:

- Ranked destination options.
- Flight fit.
- Hotel fit.
- Total budget envelope.
- Seasonal confidence.
- Mood/vibe fit.
- Fatigue score.
- Baby comfort score.
- Honeymoon value score.
- Budget pressure score.
- Trade-off explanations.
- Data confidence labels.

## Options layer owns

The Options layer should render:

- Compact recommendation cards.
- Winner strips.
- Comparison lenses.
- Flight/hotel/budget summaries.
- Watch-outs.
- Confidence labels.
- Progressive details.

Options should not calculate raw flight or hotel truth. It should consume structured engine output.

## Recommended future folder shape

```txt
src/data/catalog/countries.js
src/data/catalog/destinations.js
src/data/catalog/airports.js
src/data/catalog/flights.js
src/data/catalog/hotels.js
src/data/catalog/seasonality.js
src/data/catalog/trends.js
src/data/catalog/moods.js
src/data/catalog/sources.js

src/engine/flights.js
src/engine/hotels.js
src/engine/seasonality.js
src/engine/trends.js
src/engine/tradeoffs.js
```

## Recommended record concepts

### Flight record

A future flight record should be structured enough to support calculation:

```txt
flightRoute:
  origin
  destination
  country
  typicalDuration
  typicalStops
  priceBandByMonth
  comfortNotes
  babyEase
  reliability
  source
  updatedAt
```

### Hotel record

A future hotel or hotel-area record should support stay strategy and budget calculation:

```txt
hotelProfile:
  destination
  area
  experienceTier
  priceBandBySeason
  familyComfort
  honeymoonValue
  transferEase
  nearbyMood
  source
  updatedAt
```

### Seasonality record

```txt
seasonality:
  destination
  month
  weatherComfort
  crowdLevel
  pricePressure
  babyComfort
  honeymoonMood
  riskNotes
```

### Trend record

```txt
trendSignal:
  destination
  period
  signalType
  strength
  description
  source
  updatedAt
```

## Options compatibility rule

The Options UI should expect recommendation objects to become richer over time.

Recommended shape:

```txt
recommendation:
  id
  title
  fitScore
  fitLabel
  verdict
  summary
  budgetPressure
  fatigueLevel
  babyEase
  honeymoonValue
  flightFit
  hotelFit
  seasonalityFit
  trendFit
  confidence
  dataFreshness
  warnings
  reasons
  tradeoffs
  readyImplications
```

The UI should ignore unknown fields rather than fail.

## Source and freshness rule

Any real-world travel data should eventually carry:

- Source name or source type.
- Last updated date.
- Confidence level.
- Manual override flag, if applicable.

This is especially important for prices, flight schedules, hotel costs, visa/admin rules, and seasonal/trend data.

## Non-goals for the Options implementation

The current Options UI implementation should not wait for the future database.

It should prepare for it by:

- Rendering structured fields when present.
- Ignoring fields it does not yet use.
- Avoiding hard-coded flight/hotel facts inside view code.
- Keeping calculations in the engine layer.
