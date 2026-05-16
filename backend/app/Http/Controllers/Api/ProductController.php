<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    private function generateSlug(string $name): string
    {
        $slug = Str::slug($name);
        $original = $slug;
        $count = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $count;
            $count++;
        }

        return $slug;
    }

    public function index()
    {
        // $products = Product::all();
        // $products = Product::latest()->get();
        // $products = Product::select('name')->get(); // hasilnya atribut selain yang diselect akan menjadi null
        $products = Product::select('id', 'name', 'slug', 'price')
            ->latest()
            ->get();

        // return response()->json($products);

        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request)
    {
        $slug = $this->generateSlug($request->name);

        $product = Product::create([
            ...$request->validated(),
            'slug' => $slug,
        ]);

        return new ProductResource($product);
    }
}
