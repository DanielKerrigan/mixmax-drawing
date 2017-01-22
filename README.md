# Mixmax Drawing Enhancement

This is an open source Mixmax Enhancement. It allows you to make and email drawings. These drawing can be edited by the recipient, with the changes shown in the sender's email. We were guided by the [Mixmax Giphy Enhancement Tutorial](http://developer.mixmax.com/docs/overview-enhancement#tutorial-building-giphy-enhancement).

## How to use

Go to the Mixmax Dashboard and then Settings -> Integrations -> Add Enhancements.

| Input name  | Value                                              |
|-------------|----------------------------------------------------|
| Name        | Drawing                                            |
| Icon Tooltip| Drawing                                            |
| Editor URL  | https://boilmake-drawapp.herokuapp.com/editor      |
| Resolver URL| https://boilmake-drawapp.herokuapp.com/api/resolver|
| Activate URL| leave blank                                        |

## Running locally

1. Install using `npm install`
2. Run using `npm start`


To test the editor locally, go to <http://localhost:8910/editor> in your browser.
