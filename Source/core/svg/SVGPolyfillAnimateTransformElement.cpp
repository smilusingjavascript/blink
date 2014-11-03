// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "config.h"
#include "core/svg/SVGPolyfillAnimateTransformElement.h"

namespace blink {

inline SVGPolyfillAnimateTransformElement::SVGPolyfillAnimateTransformElement(Document& document)
    : SVGPolyfillAnimationElement(SVGNames::animateTransformTag, document)
{
}

DEFINE_NODE_FACTORY(SVGPolyfillAnimateTransformElement)

}
