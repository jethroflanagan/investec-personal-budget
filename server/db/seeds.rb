# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# def rand_time(from, to=Time.now)
#   Time.at(rand_in_range(from.to_f, to.to_f))
# end

# def rand_in_range(from, to)
#   rand * (to - from) + from
# end

person1 = User.create!(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.email,
  avatar: 'person1.svg'
)

person2 = User.create!(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.email,
  avatar: 'person2.svg'
)


# Groups
home_group = Group.create!(name: "Home", color: '#597ef7')
holiday_group = Group.create!(name: "Holiday", color: '#9254de')

person1.groups << home_group
person1.groups << holiday_group

person2.groups << home_group
person2.groups << holiday_group

10.times do
  country_code = Faker::Address.country_code
  country_name = Faker::Address.country_by_code(code: country_code)
  merchant = Merchant.create!(
    name: Faker::Company.name,
    city: Faker::Address.city,
    country_code: country_code,
    code: Faker::Number.number(digits: 4)
  )
end

["Transfer", "Groceries", "Household items", "Takeout", "Travel", "Electricity", "Rent"].each do |category|
  Category.create!(name: category)
end

def fake_date(days_ago, to = nil)
  Faker::Time.between(from: days_ago.days.ago, to: (to ? to : Time.now))
end

def later_date(from)
  return fake_date(20) if from.nil?

  Faker::Time.between(from: from, to: Time.now)
end

def create_transaction(user)
  InvestecTransaction.create!(
    amount: rand(3_000),
    merchant: Merchant.all.sample,
    currency_code: 'ZAR',
    user: user,
    api_updated_at: fake_date(20)
  )
end

descriptions = ["Emergency shopping", "Going out together", "Basics", "Not sure what this was", "Treats"]
holiday_descriptions = ["Emergency shopping", "Clothes", "Camping", "Not sure what this was", "Snacks for the journey", "Savings"]

# home
[person1, person2].each do |user|
  count = rand(5) + 20
  count.times do
    t = create_transaction(user) if rand(10) > 3 && user == person1

    expense = Expense.create!(
      amount: rand(3_000),
      user: user,
      group: home_group,
      description: (descriptions.sample if rand(10) > 5),
      category: Category.all.sample,
      date: later_date(t&.api_updated_at),
      investec_transaction: t
    )

    t.update(expense: expense) if t
  end
end

# holiday
[person1, person2].each do |user|
  count = rand(5) + 10
  count.times do
    t = create_transaction(user) if rand(10) > 3 && user == person1

    expense = Expense.create!(
      amount: rand(3_000),
      user: user,
      group: holiday_group,
      description: (holiday_descriptions.sample if rand(10) > 5),
      category: Category.all.sample,
      date: later_date(t&.api_updated_at),
      investec_transaction: t
    )

    t.update(expense: expense) if t
  end
end

# unassigned to a group
[person1].each do |user|
  count = rand(5) + 10
  count.times do
    t = create_transaction(user)
  end
end




# Transaction.create!(
#   amount: rand(3_000_00),
#   merchant: Merchant.all.sample,
#   currency_code: 'ZAR',
#   user: user,
#   api_updated_at: 2.days.ago
# )

# expense = Expense.create!(
#   amount: rand(3_000_00),
#   user: user,
#   group: home_group,
#   category: Category.all.sample,
#   date: 1.day.ago,
# )
