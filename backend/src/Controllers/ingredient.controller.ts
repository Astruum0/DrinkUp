import { Ingredient } from 'src/Schemas/ingredient.schema';
import { CreateIngredientDto } from './../Dto/create-ingredient.dto';
import { StripeRequestDto } from './../Dto/stripe-request.dto';
import { Controller, Get, Post, Param, Delete, Body, Redirect } from '@nestjs/common';
import { IngredientsService } from 'src/Services/ingredient.service';
import { randomUUID } from 'crypto';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
const stripe = require('stripe')(
  'sk_test_51MhVWdK5m5JuNCOY8BauuEGBtt8E86uLxCmqIw4rsFry4Idm6R5jfGT2uuqA6qISPQYbMSCIaBnLT5RwYmToTxOQ00FLOVipFB',
);

async function does_product_exist(name) {
  const product_list = await stripe.products.list();
  const products = product_list.data;

  for (let index = 0; index < products.length; index++) {
    const current_name = products[index].name;
    if (name == current_name) {
      return [true, products[index].id];
    }
  }
  return [false, null];
}

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @Post('/create')
  @ApiCreatedResponse({
    status: 201,
    description: 'The Ingredient has been successfully created.',
    type: CreateIngredientDto,
  })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    const ingredient: Ingredient = {
      id: randomUUID(),
      keywords: createIngredientDto.keywords,
      name: createIngredientDto.name,
      picture: createIngredientDto.picture,
      type: createIngredientDto.type,
    };
    try {
      return this.ingredientService.create(ingredient);
    } catch (e: unknown) {
      return {
        error:
          typeof e === 'string'
            ? e.toUpperCase()
            : e instanceof Error
            ? e.message
            : 'Error',
      };
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all the ingredients',
    type: [Ingredient],
  })
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the given ingredient',
    type: Ingredient,
  })
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deletes an ingredient',
    type: String,
  })
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Redirect('https://docs.nestjs.com', 302)
  @Post('/create-checkout-session')
  async create_checkout_session(@Body() stripe_request: StripeRequestDto) {
    const name = stripe_request.name;
    const qty = stripe_request.qty;
    const base_price = stripe_request.base_price;
    const description = stripe_request.description;

    let [exist, id] = await does_product_exist(name);

    if (exist) {
      const product = await stripe.products.retrieve(id);
    } else {
      const product = await stripe.products.create({
        name: name,
        images: [],
        description: description,
      });
      id = product.id;
    }

    const price = await stripe.prices.create({
      unit_amount: base_price * 100,
      currency: 'eur',
      product: id,
      tax_behavior: 'exclusive',
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: qty,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/order?success=true`,
      cancel_url: `http://localhost:3000/order?canceled=true`,
      automatic_tax: { enabled: true },
    });

    return { url: session.url };
  }
}
