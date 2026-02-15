"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
  Chip,
  Slider,
} from "@heroui/react";
// Custom SVG icons to avoid dependency issues
function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    </svg>
  );
}
import { SKILLS } from "@/data/skills";
import { SkillCard } from "@/components/skill-card";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function BrowseContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState("name");

  // Get unique categories from skills
  const categories = useMemo(() => {
    const cats = [...new Set(SKILLS.map(skill => skill.category))];
    return cats.sort();
  }, []);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let filtered = SKILLS.filter(skill => {
      // Search filter
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;

      // Price filter
      const matchesPrice = skill.priceNum >= priceRange[0] && skill.priceNum <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort skills
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 10]);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SiteNavbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Browse Skills
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Discover premium AI agent skills to supercharge your productivity
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 mb-8">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Search */}
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />}
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "bg-gray-800/50 border-gray-600 data-[hover=true]:border-gray-500"
                  }}
                />
              </div>

              {/* Category */}
              <Select
                placeholder="All Categories"
                selectedKeys={selectedCategory === "all" ? new Set([]) : new Set([selectedCategory])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setSelectedCategory(selected || "all");
                }}
                classNames={{
                  trigger: "bg-gray-800/50 border-gray-600 data-[hover=true]:border-gray-500",
                }}
              >
                <SelectItem key="all">All Categories</SelectItem>
                <SelectItem key="Trading">Trading</SelectItem>
                <SelectItem key="Productivity">Productivity</SelectItem>
                <SelectItem key="Development">Development</SelectItem>
                <SelectItem key="Content">Content</SelectItem>
                <SelectItem key="Marketing">Marketing</SelectItem>
                <SelectItem key="Analysis">Analysis</SelectItem>
              </Select>

              {/* Sort */}
              <Select
                placeholder="Sort by"
                selectedKeys={new Set([sortBy])}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                classNames={{
                  trigger: "bg-gray-800/50 border-gray-600 data-[hover=true]:border-gray-500",
                }}
              >
                <SelectItem key="name">Name</SelectItem>
                <SelectItem key="price-low">Price (Low to High)</SelectItem>
                <SelectItem key="price-high">Price (High to Low)</SelectItem>
                <SelectItem key="rating">Highest Rated</SelectItem>
                <SelectItem key="reviews">Most Reviews</SelectItem>
              </Select>

              {/* Clear Filters */}
              <Button
                variant="flat"
                color="secondary"
                startContent={<FunnelIcon className="h-4 w-4" />}
                onPress={clearFilters}
                className="h-10"
              >
                Clear
              </Button>
            </div>

            {/* Price Range */}
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 min-w-fit">Price Range:</span>
                <Slider
                  size="sm"
                  step={1}
                  minValue={0}
                  maxValue={10}
                  value={priceRange}
                  onChange={(value) => setPriceRange(Array.isArray(value) ? value : [value, 10])}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  className="flex-1 max-w-md"
                  classNames={{
                    track: "bg-gray-700",
                    filler: "bg-gradient-to-r from-blue-500 to-purple-500"
                  }}
                />
                <span className="text-sm text-gray-400 min-w-fit">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-400">
              {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
            </p>
            {(searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 10) && (
              <div className="flex gap-2">
                {searchQuery && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    onClose={() => setSearchQuery("")}
                  >
                    &quot;{searchQuery}&quot;
                  </Chip>
                )}
                {selectedCategory !== "all" && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onClose={() => setSelectedCategory("all")}
                  >
                    {selectedCategory}
                  </Chip>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 10) && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="success"
                    onClose={() => setPriceRange([0, 10])}
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                  </Chip>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50">
            <CardBody className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No skills found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button color="primary" variant="flat" onPress={clearFilters}>
                Clear All Filters
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.slug}
                slug={skill.slug}
                name={skill.name}
                tagline={skill.tagline}
                price={skill.price}
                priceNum={skill.priceNum}
                category={skill.category}
                rating={skill.rating}
                heroImage={skill.heroImage}
                heroOverlay={skill.heroOverlay}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}