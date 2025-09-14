---
title: Volunteer
sections:
  - _block: info
    title: "Join Our Volunteer Network"
    blurb: |
      We rely on volunteers to cook meals, mentor youth, and transport resources.
      There’s a place for everyone to make a difference.
    cta:
      text: "Sign Up"
      target: "#volunteer-form"

  - _block: form
    fields:
      - type: text
        name: fullName
        label: "Full Name"
        required: true
      - type: email
        name: email
        label: "Email"
        required: true
      - type: select
        name: interest
        label: "Area of Interest"
        options:
          - Meals
          - Mentoring
          - Transport
          - Admin
    submit:
      text: "Volunteer"
      action: "/api/volunteer"
---
