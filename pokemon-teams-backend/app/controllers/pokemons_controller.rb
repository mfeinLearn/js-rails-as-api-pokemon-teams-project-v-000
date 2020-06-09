require 'pry'
class PokemonsController < ApplicationController
# index
# show
# create - not a new
# destroy
def index
    pokemons = Pokemon.all
    render json: pokemons
end

def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon
end

def create
    # create a new pokemn for an existing trainer
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.pokemons.build({
        nickname: Faker::Name.first_name,
        species: Faker::Games::Pokemon.name
    })
    if pokemon.save
        render json: pokemon
    else
        binding.pry
    end
end

def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
end

end