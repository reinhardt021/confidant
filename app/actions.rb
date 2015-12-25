# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.includes(:numbers).as_json(include: :numbers)
  json contacts
end

get '/contacts/find' do
  results = { result: false }
  search = params[:search].strip
  contacts = Contact.search(search)

  if contacts.any?
    results[:result] = true
    results[:contacts] = contacts
  end 

  json results
end

post '/contacts' do
  results = { result: false }
  firstname = params[:firstName]
  lastname = params[:lastName]
  email = params[:email]
  phoneNumbers = params[:numbers]

  puts phoneNumbers

  contact = Contact.new(
    firstname: firstname,
    lastname: lastname,
    email: email 
  )

  if contact.save
    if phoneNumbers[:digits]
      contact.numbers.create(
        digits: phoneNumbers[:digits],
        number_class: phoneNumbers[:number_class]
      )
    end

    results[:result] = true
    results[:contact] = Contact.where(id: contact.id).includes(:numbers).as_json(include: :numbers).first
  end

  json results
end

put '/contacts/:id' do |id|
  contact = Contact.find(id)
  digits = params[:numbers][:digits]

  
  contact.update_attributes({firstname: params[:firstName], lastname: params[:lastName], email: params[:email]})

  if digits
    numbers = Number.where(contact_id: id).first

    if numbers
      numbers.update_attributes({
        digits: digits, 
        number_class: params[:numbers][:number_class]
      })  
    else
      contact.numbers.create(
        digits: digits,
        number_class: params[:numbers][:number_class]
      )
    end 
    
  end
end

delete '/contacts/:id/delete' do
  results = { result: false }
  contact = Contact.find(params[:id])
  
  if contact
    contact.destroy
    results[:result] = true
  end
  
  json results
end


