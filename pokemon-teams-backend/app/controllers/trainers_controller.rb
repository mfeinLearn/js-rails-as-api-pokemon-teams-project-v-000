class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, include: [:pokemons]
    end

end
# the backend only deals with data - the information and how to
### update the storage to the database and then how to pass that along
### in order to do crud opperations
# javascript only deals with what we visually see
