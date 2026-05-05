# Destination Intelligence Contract

Status: Draft  
Area: Data / Engine / Options / Ready / Future Explore  
Created: 2026-05-05

This contract prepares Holiday Planner for a deep destination database organized by country, region, city, and local points of interest.

## Why this exists

Holiday Planner will begin with, and continue expanding toward, a rich destination intelligence catalog. This catalog is not limited to destination names or high-level country notes.

It should support detailed planning across:

- Countries.
- Regions.
- Cities.
- Places to visit.
- Restaurants.
- Shopping areas and sites.
- Picturesque/photo locations.
- Local transport.
- Activities.
- Seasonality.
- Mood/vibe.
- Cost bands.
- Practical travel details.

## Core rule

The catalog stores the world.  
The engine interprets the world.  
Options compares interpreted trip directions.  
Ready operationalizes the selected direction.

## Data hierarchy

Recommended hierarchy:

```txt
country
  region
    city
      placeToVisit
      restaurant
      shoppingSite
      picturesqueLocation
      activity
      localTransportOption
      areaNote
```

This hierarchy should be flexible enough for countries where regions are less important, or where island groups, resort zones, or districts are more useful than administrative regions.

## Country records should support

A country-level record may include:

- Country name.
- Visa/admin summary.
- Currency.
- Language notes.
- General safety/practicality.
- Family comfort baseline.
- Infant travel practicality.
- Honeymoon value baseline.
- Food compatibility notes.
- Shopping profile.
- Weather/seasonality summary.
- Regional structure.
- Major entry airports.
- Typical trip length suitability.
- Cost confidence.
- Source/freshness metadata.

## Region records should support

A region-level record may include:

- Region name.
- Country.
- Best months.
- Transfer complexity.
- Mood/vibe.
- City list.
- Hotel/resort pattern.
- Food pattern.
- Shopping pattern.
- Scenic/photo value.
- Baby comfort notes.
- Honeymoon value notes.
- Budget pressure.
- Risk/watch-outs.

Examples of useful region concepts:

- Bali beach zones.
- UAE emirates.
- Thailand island/urban regions.
- Sri Lanka coast/highland/urban regions.
- Vietnam north/central/south regions.
- Italy city/region clusters.

## City records should support

A city-level record may include:

- City name.
- Region and country.
- Airport/arrival practicality.
- Best stay areas.
- Average local travel friction.
- Restaurant depth.
- Shopping depth.
- Picturesque/photo depth.
- Activity depth.
- Baby-friendly movement score.
- Honeymoon mood score.
- Rain/heat sensitivity.
- Cost bands.
- Minimum useful nights.
- Ideal nights.
- Watch-outs.
- Source/freshness metadata.

## Places to visit should support

A place record may include:

- Name.
- City/region/country.
- Category.
- Mood/vibe.
- Time required.
- Best time of day.
- Weather sensitivity.
- Baby/stroller practicality.
- Transfer friction.
- Ticket/entry cost band.
- Crowd level.
- Photo value.
- Honeymoon value.
- Notes.
- Source/freshness metadata.

## Restaurant records should support

A restaurant or food-area record may include:

- Name or area.
- City/region/country.
- Cuisine.
- Meal type.
- Cost band.
- Baby-friendly practicality.
- Vegetarian/Jain/Indian-food compatibility where relevant.
- Reservation difficulty.
- Travel friction.
- Mood/vibe.
- View/scenic value.
- Reliability/confidence.
- Notes.
- Source/freshness metadata.

## Shopping records should support

A shopping record may include:

- Name or area.
- City/region/country.
- Shopping type.
- Cost pressure.
- Bargain value.
- Luxury temptation index.
- Baby/family practicality.
- Time required.
- Transfer friction.
- Weather sensitivity.
- Best time to visit.
- Notes.
- Source/freshness metadata.

## Picturesque location records should support

A picturesque/photo-location record may include:

- Name.
- City/region/country.
- Photo type.
- Best time of day.
- Weather sensitivity.
- Crowd risk.
- Transfer friction.
- Baby practicality.
- Honeymoon value.
- Outfit/shopping relevance, if useful.
- Safety/practicality notes.
- Source/freshness metadata.

## Engine responsibilities

The engine should convert catalog depth into planning signals such as:

- Destination fit.
- City fit.
- Region fit.
- Local movement burden.
- Food compatibility.
- Shopping pressure.
- Photo/honeymoon value.
- Baby practicality.
- Seasonality fit.
- Activity density.
- Cost pressure.
- Confidence and freshness.
- Recommended stay distribution.
- Suggested sequencing.

## Options responsibilities

Options should not expose the whole catalog.

Options should compare trip directions using compact signals derived from the catalog, for example:

- Stronger restaurant depth.
- Better shopping value.
- Better baby-friendly movement.
- Stronger photo/honeymoon locations.
- Lower local travel burden.
- Better August/season fit.
- Higher or lower local spend pressure.
- Richer city/region depth.

## Ready responsibilities

Ready may turn the selected direction into action-oriented planning outputs:

- Pre-trip preparation.
- City stay distribution.
- Local movement checklist.
- Restaurant shortlist readiness.
- Shopping plan readiness.
- Photo-location readiness.
- Baby comfort checklist.
- Post-trip calm-down plan.

## Future Explore / Detail responsibility

A future Explore or Detail layer may expose database depth directly.

Possible views:

- Country detail.
- Region detail.
- City detail.
- Places-to-visit shortlist.
- Restaurant shortlist.
- Shopping shortlist.
- Photo-location shortlist.
- Local transport notes.
- Day-plan builder.

This should not be forced into Options if it makes Options vertically heavy again.

## Recommended future folder shape

```txt
src/data/catalog/countries/
src/data/catalog/regions/
src/data/catalog/cities/
src/data/catalog/places/
src/data/catalog/restaurants/
src/data/catalog/shopping/
src/data/catalog/photo-locations/
src/data/catalog/local-transport/
src/data/catalog/activities/
src/data/catalog/seasonality/
src/data/catalog/sources/

src/engine/destinations/
src/engine/cities/
src/engine/regions/
src/engine/food/
src/engine/shopping/
src/engine/photo-value/
src/engine/local-movement/
src/engine/itinerary/
```

## Recommended destination intelligence output shape

Options and Ready should consume interpreted outputs like:

```txt
destinationIntelligence:
  destinationId
  country
  regions
  cities
  fitScore
  confidence
  seasonalityFit
  babyPracticality
  honeymoonValue
  localMovementBurden
  restaurantDepth
  shoppingProfile
  photoValue
  activityDensity
  budgetPressure
  watchouts
  bestFor
  avoidIf
  sourceSummary
```

## Compatibility rule

UI modules must ignore unknown future fields safely.

This allows the catalog to become more detailed without breaking Options, Ready, or future detail views.

## Non-goals for current Options work

The current Options implementation should not wait for the full catalog.

It should prepare by:

- Rendering compact interpreted signals.
- Keeping raw catalog facts out of view code.
- Avoiding hard-coded city, restaurant, shopping, and photo-location facts in Options UI.
- Leaving deep catalog browsing to future detail views.
