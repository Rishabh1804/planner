# Budget Intelligence Contract

Status: Draft  
Area: Budget / Data / Engine / Options / Ready  
Created: 2026-05-05

This contract prepares Holiday Planner for an extensive budget database covering the full trip lifecycle, not only flights and hotels.

## Why this exists

Future versions will include a thorough database for country-specific and destination-specific trip costs, including:

- Flights.
- Hotels.
- Local transport.
- Restaurants.
- Activities.
- Shopping.
- Pre-vacation purchases.
- Extra expenses.
- Contingency buffers.
- Post-vacation calm-down or recovery costs.

This changes the product from a simple budget estimator into a total-trip cost intelligence layer.

## Core rule

Budget should mean total trip reality, not only booking cost.

Flights and hotels are only the visible booking layer. The planner must also model local spending, preparation spending, discretionary spending, and post-trip recovery.

## Ownership boundary

Data owns cost facts.  
Engine owns cost calculations.  
Options compares budget pressure.  
Ready turns budget into preparation actions.

## Data layer owns

The data layer should eventually store structured budget records for each relevant country, destination, city, area, and experience tier.

### Booking costs

- International flights.
- Domestic or regional connecting flights.
- Hotels and resorts.
- Service apartments or villas.
- Taxes, resort fees, city taxes, and mandatory charges.
- Visa/admin charges.
- Travel insurance.

### Local movement costs

- Airport transfers.
- Intercity transfers.
- Taxi/private cab costs.
- Rental car costs.
- Public transport costs.
- Baby-friendly transport premium.
- Luggage handling or porter charges.
- Local SIM/eSIM or connectivity costs.

### Food and restaurant costs

- Breakfast if not included.
- Casual meals.
- Mid-range restaurants.
- Premium restaurants.
- Baby-friendly restaurant availability.
- Vegetarian/Jain/Indian-food availability where relevant.
- Cafe/snack costs.
- Drinking water and convenience purchases.

### Activities and experience costs

- Sightseeing.
- Tours.
- Theme parks.
- Spa/wellness.
- Baby-friendly activities.
- Honeymoon experiences.
- Photography or special experiences.
- Weather-dependent alternatives.

### Shopping and discretionary costs

- Shopping districts.
- Outlet malls.
- Local markets.
- Souvenirs.
- Baby items.
- Luxury shopping risk.
- Bargain-shopping opportunities.
- Shopping temptation index.

### Pre-vacation costs

- Clothing.
- Shoes.
- Baby travel gear.
- Stroller/carrier accessories.
- Medicines.
- Toiletries.
- Luggage.
- Travel adapters.
- Documents/photos/printing.
- Currency/card setup costs.

### Extra and hidden expenses

- Baggage fees.
- Seat selection.
- Tips and service charges.
- Laundry.
- Early check-in / late checkout.
- Cancellation/change buffers.
- Medical contingency.
- Emergency transport.
- Exchange-rate buffer.
- Payment gateway/card markup.

### Post-vacation calm-down costs

- Buffer day after return.
- Easy meals after return.
- Laundry/dry cleaning.
- House reset.
- Baby routine reset.
- Work catch-up buffer.
- Recovery/rest planning.
- Post-trip photo/book/memory expenses.

## Engine layer owns

The engine should calculate:

- Base trip budget.
- Booking budget.
- On-ground budget.
- Food budget.
- Local transport budget.
- Activity budget.
- Shopping budget.
- Pre-trip preparation budget.
- Hidden expense buffer.
- Post-trip recovery budget.
- Total realistic trip envelope.
- Budget pressure by destination.
- Budget confidence by data freshness.
- Experience-tier multiplier effects.
- Infant/family-comfort budget premium.
- Seasonality-driven cost pressure.
- Mood/vibe-driven discretionary spending risk.

## Options layer owns

Options should compare budget pressure compactly.

Options may display:

- Total realistic budget range.
- Booking cost estimate.
- On-ground spend estimate.
- Preparation cost estimate.
- Hidden buffer.
- Shopping risk.
- Food/restaurant cost pressure.
- Local transport pressure.
- Cost confidence and freshness.

Options should not become the full budget ledger. It should summarize and compare.

## Ready layer owns

Ready should turn budget into action.

Ready may display:

- Pre-shopping checklist.
- Currency/payment checklist.
- Local transport readiness.
- Food planning notes.
- Buffer-day planning.
- Emergency budget reminder.
- Post-vacation calm-down plan.

Ready should not re-rank destinations unless the user explicitly changes budget constraints.

## Recommended future folder shape

```txt
src/data/catalog/budget/
  countries.js
  destinations.js
  flights.js
  hotels.js
  local-transport.js
  restaurants.js
  activities.js
  shopping.js
  pre-trip.js
  hidden-expenses.js
  post-trip.js
  sources.js

src/engine/budget/
  booking-costs.js
  ground-costs.js
  food-costs.js
  activity-costs.js
  shopping-risk.js
  preparation-costs.js
  hidden-expenses.js
  post-trip-costs.js
  total-envelope.js
  confidence.js
```

## Recommended budget object shape

```txt
budgetEnvelope:
  currency
  totalRange
  confidence
  freshness
  booking:
    flights
    hotels
    visaAdmin
    insurance
  onGround:
    localTransport
    foodRestaurants
    activities
    connectivity
    laundry
  discretionary:
    shopping
    souvenirs
    premiumExperiences
  preparation:
    clothing
    babyTravelGear
    medicines
    luggage
    documents
  hidden:
    baggage
    tips
    earlyLateHotel
    paymentMarkup
    emergencyBuffer
  postTrip:
    calmDownMeals
    laundryReset
    bufferDay
    routineReset
  pressure:
    label
    score
    reasons
  assumptions
  sourceSummary
```

## Budget display principle

Default Options view should answer:

> Is this trip financially comfortable, stretched, or risky for the experience we selected?

Detailed budget view should answer:

> Where is the money actually going, including the costs people usually forget?

## Data freshness rule

Every real-world budget record should eventually carry:

- Source type.
- Last updated date.
- Confidence level.
- Season or month applicability.
- Destination/city specificity.
- Experience-tier applicability.
- Manual override flag, if any.

## Non-goals for current Options implementation

The current Options module should not wait for this database.

It should prepare by:

- Rendering budget summaries from structured objects.
- Ignoring unknown future budget fields safely.
- Avoiding hard-coded cost facts inside UI code.
- Keeping calculation logic in the engine layer.
- Keeping detailed preparation and post-trip actions for Ready.
